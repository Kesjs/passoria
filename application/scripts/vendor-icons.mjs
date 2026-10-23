import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {dirname,resolve} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));
const require=createRequire(import.meta.url);
const packageRoot=dirname(require.resolve('lucide/package.json'));
const metadata=JSON.parse(await readFile(resolve(packageRoot,'package.json'),'utf8'));
const map=JSON.parse(await readFile(resolve(root,'icon-map.json'),'utf8'));
const nodes={};
for(const [alias,name] of Object.entries(map)) {
  const module=await import(pathToFileURL(resolve(packageRoot,`dist/esm/icons/${name}.mjs`)));
  nodes[alias]=module.default;
}
const destination=resolve(root,'public/vendor/lucide');
await mkdir(destination,{recursive:true});
await writeFile(resolve(destination,'icons.mjs'),`/** Generated from lucide ${metadata.version}. ISC / Feather MIT; see LICENSE. Do not edit SVG nodes by hand. */\nexport const LUCIDE_VERSION = ${JSON.stringify(metadata.version)};\nexport const ICON_NODES = ${JSON.stringify(nodes,null,2)};\n`);
for(const name of ['createElement.mjs','defaultAttributes.mjs','createElement.mjs.map','defaultAttributes.mjs.map'])await copyFile(resolve(packageRoot,'dist/esm',name),resolve(destination,name));
await copyFile(resolve(packageRoot,'LICENSE'),resolve(destination,'LICENSE'));
console.log(`Lucide ${metadata.version}: ${Object.keys(nodes).length} icônes officielles intégrées localement.`);
