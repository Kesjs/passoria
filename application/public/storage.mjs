let db;
let activeScope='current';
export function storageScope(){return activeScope;}
export function setStorageScope(identity){
  if(identity==='demo'){activeScope='current';return;}
  if(!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(identity||''))throw Error('Identité locale invalide.');
  activeScope=`account:${identity}`;
}
export async function openStore() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('passoria-demo-v1', 1);
    req.onupgradeneeded = () => req.result.createObjectStore('state');
    req.onerror = () => reject(req.error);
    req.onsuccess = () => { db = req.result; resolve(); };
  });
}
export async function loadState(scope=activeScope) {
  return new Promise((resolve, reject) => {
    const req = db.transaction('state').objectStore('state').get(scope);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
export async function saveState(state,scope=activeScope) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('state', 'readwrite');
    tx.objectStore('state').put(state, scope);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error || new Error('Enregistrement interrompu'));
  });
}
