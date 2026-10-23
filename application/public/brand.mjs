// Adaptation vectorielle du concept 03 « Le lien », choisi par l’utilisateur.
export const BRAND_PATHS = {
  upper: 'M99 28H151C227 28 280 73 280 133C280 191 238 222 177 222H145C185 203 210 181 210 152C210 126 191 109 163 109H127C107 109 99 98 99 78Z',
  lower: 'M48 266V184C48 139 82 113 125 113H145C156 113 163 119 163 130V153C163 171 152 179 135 185C116 192 110 205 110 223V244C110 266 96 280 70 287L63 289C54 291 48 282 48 266Z'
};
export function brandMark(className='') {
  return `<svg class="passoria-mark ${className}" viewBox="0 0 320 320" fill="none" aria-hidden="true" focusable="false"><path class="mark-upper" d="${BRAND_PATHS.upper}" fill="#08684C"/><path class="mark-lower" d="${BRAND_PATHS.lower}" fill="#73B98B"/></svg>`;
}
export function brandLockup(){return `<span class="brand-lockup">${brandMark()}<span>Passoria<small>Toutes vos démarches, un seul espace.</small></span></span>`;}
