import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {BRAND_PATHS} from '../public/brand.mjs';
const root=fileURLToPath(new URL('../public/',import.meta.url));
const body=`<path d="${BRAND_PATHS.upper}" fill="#08684C"/><path d="${BRAND_PATHS.lower}" fill="#73B98B"/>`;
const logo=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320"><title>Passoria : le lien</title>${body}</svg>`;
await writeFile(resolve(root,'logo.svg'),logo);
await writeFile(resolve(root,'icon.svg'),logo);
await mkdir(resolve(root,'icons'),{recursive:true});
for(const size of [192,512]){
 const icon=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="108" fill="#F0F8F2"/><g transform="translate(80 70) scale(1.1)">${body}</g></svg>`;
 await sharp(Buffer.from(icon)).resize(size,size).png().toFile(resolve(root,`icons/icon-${size}.png`));
}
const mask=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="#F0F8F2"/><g transform="translate(112 106) scale(.9)">${body}</g></svg>`;
await sharp(Buffer.from(mask)).png().toFile(resolve(root,'icons/maskable-512.png'));
const apple=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="#F0F8F2"/><g transform="translate(80 70) scale(1.1)">${body}</g></svg>`;
await sharp(Buffer.from(apple)).resize(180,180).png().toFile(resolve(root,'icons/apple-touch-icon.png'));
console.log('Logo Le lien : SVG, icônes 192/512, maskable et Apple générés.');
// Aperçu partageable : l’application utilise les courbes SVG/CSS, pas ce GIF.
const frames=[],side=360,count=38;
for(let i=0;i<count;i++){
 const t=Math.min(1,i/16),ease=1-Math.pow(1-t,3),dx=26*(1-ease),dy=24*(1-ease);
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="360" height="360" viewBox="0 0 360 360"><rect width="360" height="360" fill="#f7faf8"/><g transform="translate(68 30) scale(.7)"><path d="${BRAND_PATHS.upper}" fill="#08684C" opacity="${ease}" transform="translate(${dx} ${-dy})"/><path d="${BRAND_PATHS.lower}" fill="#73B98B" opacity="${ease}" transform="translate(${-dx} ${dy})"/></g><text x="180" y="286" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="33" letter-spacing="-1" fill="#142d24">Passoria</text><text x="180" y="314" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#657b6d">Toutes vos démarches, un seul espace.</text></svg>`;
 frames.push(await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer());
}
await sharp(Buffer.concat(frames),{raw:{width:side,height:side*count,pageHeight:side,channels:4}}).gif({loop:0,delay:50,effort:7}).toFile(resolve(root,'logo-intro.gif'));
console.log('Aperçu GIF animé généré.');
