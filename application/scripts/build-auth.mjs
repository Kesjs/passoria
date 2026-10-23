import {build} from 'esbuild';
import {mkdir,readFile,writeFile,copyFile,readdir} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const destination=resolve(root,'public/vendor/auth');
await mkdir(destination,{recursive:true});
await build({entryPoints:[resolve(root,'scripts/auth-vendor-entry.mjs')],outfile:resolve(destination,'dependencies.mjs'),bundle:true,format:'esm',platform:'browser',target:['es2022'],minify:true,legalComments:'linked'});
const require=createRequire(import.meta.url),versions={};
for(const name of ['@supabase/supabase-js','@supabase/auth-js','@supabase/functions-js','@supabase/postgrest-js','@supabase/realtime-js','@supabase/storage-js','@supabase/phoenix','tslib','iceberg-js','libphonenumber-js']){
 const p=resolve(root,'node_modules',name);
 const metadata=JSON.parse(await readFile(resolve(p,'package.json'),'utf8'));versions[name]=metadata.version;
 const license=(await readdir(p)).find(file=>/^licen[cs]e/i.test(file));
 if(!license)throw Error(`Licence manquante pour ${name}`);
 await copyFile(resolve(p,license),resolve(destination,name.replaceAll('/','_').replace('@','')+'-LICENSE'));
}
await writeFile(resolve(destination,'versions.json'),JSON.stringify(versions,null,2)+'\n');
console.log('Modules d’authentification embarqués :',versions);
