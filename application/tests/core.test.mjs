import {test} from 'node:test';
import assert from 'node:assert/strict';
import {newCase,precheck,transition,validateFile,validateBackup,seedState} from '../public/core.mjs';

function complete(type='naissance'){
 const c=newCase(type);c.answers={lastName:'TEST',firstName:'Exemple',date:'2026-01-01',place:'Cotonou (test)',mother:'Parent fictif',declarant:'Declarant fictif',capacity:type==='naissance'?'parent':'proche'};
 const docs=[{id:'a',kind:type==='naissance'?'certificat_naissance':'certificat_deces',dataUrl:'data:application/pdf;base64,JVBERi0='},{id:'b',kind:'identite',dataUrl:'data:application/pdf;base64,JVBERi0='}];c.documents=docs.map(d=>d.id);return {c,docs};
}
test('un dossier incomplet explique les champs et les pièces manquantes',()=>{const c=newCase('naissance');const errors=precheck(c,[]);assert.ok(errors.some(e=>e.field==='mother'));assert.equal(errors.filter(e=>e.field==='documents').length,2);assert.throws(()=>transition(c,'PRET_A_SOUMETTRE','Citoyen démo'),/Complétez/);});
test('les dates futures et impossibles sont refusées',()=>{const {c,docs}=complete();for(const value of ['2027-01-01','2026-02-30','non-date','1899-12-31']){c.answers.date=value;assert.ok(precheck(c,docs,'2026-10-22').some(e=>e.field==='date'));}});
test('le mandataire doit confirmer son autorisation',()=>{const {c,docs}=complete();c.answers.capacity='mandataire';assert.ok(precheck(c,docs).some(e=>e.field==='mandate'));c.answers.mandate=true;assert.equal(precheck(c,docs).length,0);});
for(const type of ['naissance','deces'])test(`${type} : soumission, complément, correction et fin simulée`,()=>{
 let {c,docs}=complete(type);assert.deepEqual(precheck(c,docs),[]);
 c=transition(c,'PRET_A_SOUMETTRE','Citoyen démo','',docs);c=transition(c,'TRANSMIS_SIMULATION','Citoyen démo','',docs);
 assert.throws(()=>transition(c,'EN_VERIFICATION_SIMULATION','Citoyen démo'),/rôle agent/);
 c=transition(c,'EN_VERIFICATION_SIMULATION','Agent démo');assert.throws(()=>transition(c,'COMPLEMENT_DEMANDE','Agent démo',' '),/Indiquez/);
 c=transition(c,'COMPLEMENT_DEMANDE','Agent démo','Merci de corriger le nom fictif');c.answers.lastName='CORRIGE';
 c=transition(c,'PRET_A_SOUMETTRE','Citoyen démo','',docs);c=transition(c,'TRANSMIS_SIMULATION','Citoyen démo','',docs);c=transition(c,'EN_VERIFICATION_SIMULATION','Agent démo');c=transition(c,'TERMINE_SIMULATION','Agent démo','',docs);
 assert.equal(c.events.length,9);assert.equal(c.status,'TERMINE_SIMULATION');assert.throws(()=>transition(c,'BROUILLON','Citoyen démo'),/autorisée/);
});
test('supprimer une pièce associée empêche la soumission',()=>{let {c,docs}=complete();c=transition(c,'PRET_A_SOUMETTRE','Citoyen démo','',docs);assert.throws(()=>transition(c,'TRANSMIS_SIMULATION','Citoyen démo','',docs.slice(0,1)),/Complétez/);});
test('une annulation est terminale',()=>{const c=transition(newCase('deces'),'ANNULE','Citoyen démo');assert.throws(()=>transition(c,'A_COMPLETER','Citoyen démo'),/autorisée/);});
test('les fichiers refusent faux formats, types interdits et taille excessive',()=>{
 assert.throws(()=>validateFile({type:'application/pdf',size:5},new TextEncoder().encode('hello')),/contenu/);
 assert.throws(()=>validateFile({type:'text/html',size:5},new Uint8Array(5)),/Formats/);
 assert.throws(()=>validateFile({type:'application/pdf',size:6*1024*1024},new Uint8Array()),/5 Mo/);
 assert.doesNotThrow(()=>validateFile({type:'application/pdf',size:8},new TextEncoder().encode('%PDF-1.4')));
});
test('la restauration refuse les données mal formées et les documents dangereux',()=>{
 assert.deepEqual(validateBackup(seedState()),seedState());assert.throws(()=>validateBackup({version:2}),/invalide/);
 const s=seedState();s.cases=[{id:'1',status:'AUTORISE'}];assert.throws(()=>validateBackup(s),/invalide/);
 s.cases=[];s.documents=[{id:'1',kind:'identite',title:'Test',name:'x.html',mime:'text/html',dataUrl:'data:text/html;base64,AA=='}];assert.throws(()=>validateBackup(s),/invalide/);
});
