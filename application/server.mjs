import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(fileURLToPath(new URL('./public/', import.meta.url)));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png':'image/png', '.gif':'image/gif', '.json':'application/json; charset=utf-8', '.webmanifest': 'application/manifest+json' };
async function publicConfig(){
  const input=JSON.parse(await readFile(path.join(root,'auth-config.json'),'utf8'));
  let origin='';
  if(input.supabaseUrl||input.publishableKey){const u=new URL(input.supabaseUrl);if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash||u.pathname!=='/'||!/^sb_publishable_[a-zA-Z0-9_-]+$/.test(input.publishableKey||''))throw Error('Invalid public auth configuration');origin=u.origin;}
  return {supabaseUrl:origin,publishableKey:origin?input.publishableKey:'',googleEnabled:input.googleEnabled===true,phoneEnabled:input.phoneEnabled===true,allowDemo:input.allowDemo===true};
}
export function makeServer() {
  return createServer(async (req, res) => {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      let auth;
      try{auth=await publicConfig();}catch{auth={supabaseUrl:'',publishableKey:'',googleEnabled:false,phoneEnabled:false,allowDemo:false};}
      const target = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
      if (!target.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
      const body = pathname==='/auth-config.json'?Buffer.from(JSON.stringify(auth)):await readFile(target);
      res.writeHead(200, {
        'Content-Type': types[path.extname(target)] || 'application/octet-stream',
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'no-referrer',
        'Content-Security-Policy': `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: blob:; frame-src blob:; object-src 'none'; connect-src 'self'${auth.supabaseUrl?' '+auth.supabaseUrl:''}; base-uri 'none'; form-action 'self'`
      });
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('Page introuvable'); }
  });
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const portIndex = process.argv.indexOf('--port');
  const port = Number(portIndex >= 0 ? process.argv[portIndex + 1] : process.env.PORT || 3000);
  makeServer().listen(port, '0.0.0.0', () => console.log(`Passoria : http://localhost:${port}`));
}
