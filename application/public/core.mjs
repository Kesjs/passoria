export const STATUSES = {
  BROUILLON: ['Brouillon', 'neutral'], A_COMPLETER: ['À compléter', 'warning'],
  PRET_A_SOUMETTRE: ['Prêt à soumettre', 'success'], TRANSMIS_SIMULATION: ['Transmis · simulation', 'info'],
  EN_VERIFICATION_SIMULATION: ['En vérification · simulation', 'warning'],
  COMPLEMENT_DEMANDE: ['Complément demandé', 'danger'], TERMINE_SIMULATION: ['Terminé · simulation', 'success'], ANNULE: ['Annulé', 'neutral']
};
export const REQUIRED_DOCS = { naissance: ['certificat_naissance', 'identite'], deces: ['certificat_deces', 'identite'] };
export const DOC_NAMES = { certificat_naissance: 'Certificat d’accouchement', certificat_deces: 'Certificat médical de décès', identite: 'Pièce d’identité du déclarant', acte_naissance: 'Acte de naissance', arch: 'Attestation ARCH', autre: 'Autre document' };
export const EDITABLE = ['BROUILLON', 'A_COMPLETER', 'PRET_A_SOUMETTRE', 'COMPLEMENT_DEMANDE'];
export function uid() {
  if (globalThis.crypto.randomUUID) return globalThis.crypto.randomUUID();
  const bytes=globalThis.crypto.getRandomValues(new Uint8Array(16));
  bytes[6]=(bytes[6]&15)|64;bytes[8]=(bytes[8]&63)|128;
  const hex=Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
  return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
}
export function newCase(type, now = new Date()) {
  if (!Object.hasOwn(REQUIRED_DOCS,type)) throw Error('Démarche inconnue');
  const id = uid();
  return { id, type, reference: `PAS-${now.getFullYear()}-${id.slice(0,8).toUpperCase()}`, status: 'BROUILLON', answers: {}, documents: [], createdAt: now.toISOString(), updatedAt: now.toISOString(), events: [{id:uid(),at:now.toISOString(),actor:'Citoyen démo',text:'Brouillon créé'}] };
}
export function precheck(c, documents, today = new Date().toISOString().slice(0,10)) {
  const a = c.answers, errors = [];
  const required = c.type === 'naissance'
    ? {lastName:'Nom de l’enfant',firstName:'Prénom de l’enfant',date:'Date de naissance',place:'Lieu de naissance',mother:'Nom et prénoms de la mère',declarant:'Nom du déclarant',capacity:'Qualité du déclarant'}
    : {lastName:'Nom du défunt',firstName:'Prénom du défunt',date:'Date du décès',place:'Lieu du décès',declarant:'Nom du déclarant',capacity:'Lien avec le défunt'};
  for (const [field,label] of Object.entries(required)) if (!String(a[field] || '').trim()) errors.push({field,message:`${label} : information à renseigner.`});
  if (a.date && (!/^\d{4}-\d{2}-\d{2}$/.test(a.date) || !Number.isFinite(Date.parse(a.date)) || new Date(a.date).toISOString().slice(0,10) !== a.date || a.date > today || a.date < '1900-01-01')) errors.push({field:'date',message:'La date doit être valide, comprise entre 1900 et aujourd’hui.'});
  if (a.capacity === 'mandataire' && !a.mandate) errors.push({field:'mandate',message:'Confirmez disposer d’une autorisation pour cette démonstration.'});
  for (const kind of REQUIRED_DOCS[c.type]) if (!documents.some(d => c.documents.includes(d.id) && d.kind === kind && d.dataUrl)) errors.push({field:'documents',message:`Pièce à ajouter : ${DOC_NAMES[kind]}.`});
  return errors;
}
const transitions = {
  BROUILLON:['A_COMPLETER','PRET_A_SOUMETTRE','ANNULE'], A_COMPLETER:['PRET_A_SOUMETTRE','ANNULE'], PRET_A_SOUMETTRE:['A_COMPLETER','TRANSMIS_SIMULATION','ANNULE'],
  TRANSMIS_SIMULATION:['EN_VERIFICATION_SIMULATION','ANNULE'], EN_VERIFICATION_SIMULATION:['COMPLEMENT_DEMANDE','TERMINE_SIMULATION','ANNULE'],
  COMPLEMENT_DEMANDE:['A_COMPLETER','PRET_A_SOUMETTRE','ANNULE'], TERMINE_SIMULATION:[], ANNULE:[]
};
export function transition(c, next, actor, reason = '', documents = []) {
  if (!transitions[c.status]?.includes(next)) throw Error('Cette transition n’est pas autorisée.');
  const agent = ['EN_VERIFICATION_SIMULATION','COMPLEMENT_DEMANDE','TERMINE_SIMULATION'].includes(next);
  if (agent && actor !== 'Agent démo') throw Error('Cette action appartient au rôle agent de démonstration.');
  if (['PRET_A_SOUMETTRE','TRANSMIS_SIMULATION','TERMINE_SIMULATION'].includes(next) && precheck(c, documents).length) throw Error('Complétez le dossier avant cette action.');
  if (next === 'COMPLEMENT_DEMANDE' && !reason.trim()) throw Error('Indiquez le complément demandé.');
  const now = new Date().toISOString();
  return {...c,status:next,updatedAt:now,events:[...c.events,{id:uid(),at:now,actor,text:reason.trim() || STATUSES[next][0]}]};
}
export function seedState() {
  return {version:1,profile:{name:'Aïssatou Adé',role:'citoyen'},cases:[],documents:[],notifications:[],preferences:{notifications:true}};
}
export function validateFile(file, bytes) {
  const valid = ['application/pdf','image/jpeg','image/png'];
  if (!valid.includes(file.type)) throw Error('Formats acceptés : PDF, JPG et PNG.');
  if (!file.size || file.size > 5*1024*1024) throw Error('Choisissez un fichier non vide de 5 Mo maximum.');
  const u = new Uint8Array(bytes), prefix = String.fromCharCode(...u.slice(0,5));
  const match = file.type === 'application/pdf' ? prefix === '%PDF-' : file.type === 'image/jpeg' ? u[0] === 255 && u[1] === 216 && u[2] === 255 : u[0] === 137 && u[1] === 80 && u[2] === 78 && u[3] === 71 && u[4] === 13 && u[5] === 10 && u[6] === 26 && u[7] === 10;
  if (!match) throw Error('Le contenu du fichier ne correspond pas au format annoncé.');
}
export function validateBackup(s) {
  const isId = value => typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
  if (!s || s.version !== 1 || !s.profile || typeof s.profile.name !== 'string' || s.profile.name.length > 100 || !['citoyen','agent'].includes(s.profile.role) || !s.preferences || typeof s.preferences.notifications !== 'boolean') throw Error('Sauvegarde Passoria invalide.');
  for (const key of ['cases','documents','notifications']) if (!Array.isArray(s[key]) || s[key].length > 1000) throw Error('Sauvegarde invalide.');
  const ids = new Set();
  for (const d of s.documents) {
    if (!d || !isId(d.id) || ids.has(d.id) || !Object.hasOwn(DOC_NAMES,d.kind) || typeof d.title !== 'string' || typeof d.name !== 'string' || !['application/pdf','image/png','image/jpeg'].includes(d.mime) || typeof d.dataUrl !== 'string' || d.dataUrl.length > 7100000 || !d.dataUrl.startsWith(`data:${d.mime};base64,`) || !Number.isInteger(d.version) || d.version < 1 || !Number.isFinite(Date.parse(d.createdAt))) throw Error('Document invalide dans la sauvegarde.');
    ids.add(d.id);
  }
  const caseIds = new Set();
  for (const c of s.cases) {
    if (!c || !isId(c.id) || caseIds.has(c.id) || !Object.hasOwn(REQUIRED_DOCS,c.type) || !Object.hasOwn(STATUSES,c.status) || typeof c.reference !== 'string' || !/^PAS-\d{4}-[A-F0-9]{8}$/.test(c.reference) || !c.answers || typeof c.answers !== 'object' || Array.isArray(c.answers) || !Array.isArray(c.documents) || c.documents.some(id => !ids.has(id)) || !Array.isArray(c.events) || c.events.length > 5000 || !Number.isFinite(Date.parse(c.createdAt)) || !Number.isFinite(Date.parse(c.updatedAt))) throw Error('Dossier invalide dans la sauvegarde.');
    caseIds.add(c.id);
    for (const v of Object.values(c.answers)) if (!['string','boolean'].includes(typeof v)) throw Error('Réponse invalide.');
    for (const e of c.events) if (!e || typeof e.text !== 'string' || typeof e.actor !== 'string' || !Number.isFinite(Date.parse(e.at))) throw Error('Historique invalide.');
  }
  for (const n of s.notifications) if (!n || !isId(n.id) || typeof n.text !== 'string' || !Number.isFinite(Date.parse(n.at)) || typeof n.read !== 'boolean') throw Error('Notification invalide.');
  return s;
}
