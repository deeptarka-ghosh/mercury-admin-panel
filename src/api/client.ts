const API_URL=import.meta.env.VITE_API_URL??'http://localhost:3000';
export class ApiError extends Error{constructor(public status:number,public code:string,message:string){super(message);}}
interface Tokens{accessToken:string;refreshToken:string} let tokens:Tokens|null=null;
try{const raw=sessionStorage.getItem('mercury.admin.tokens');tokens=raw?JSON.parse(raw) as Tokens:null;}catch{tokens=null;}
export function setTokens(value:Tokens|null){tokens=value;try{if(value)sessionStorage.setItem('mercury.admin.tokens',JSON.stringify(value));else sessionStorage.removeItem('mercury.admin.tokens');}catch{/* Session storage may be unavailable; memory session still works. */}}
export function hasSession(){return Boolean(tokens?.accessToken)};
async function parse(response:Response){if(response.status===204)return undefined;const body=await response.json() as unknown;if(!response.ok){const error=(body as {error?:{code?:string;message?:string}}).error;throw new ApiError(response.status,error?.code??'REQUEST_FAILED',error?.message??'Request failed');}return body;}
async function refresh(){if(!tokens?.refreshToken)return false;const response=await fetch(`${API_URL}/auth/refresh`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({refreshToken:tokens.refreshToken})});if(!response.ok){setTokens(null);return false;}const body=await response.json() as Tokens;setTokens(body);return true;}
export async function api<T>(path:string,init:RequestInit={}){const headers=new Headers(init.headers);if(!(init.body instanceof FormData))headers.set('Content-Type','application/json');if(tokens?.accessToken)headers.set('Authorization',`Bearer ${tokens.accessToken}`);let response=await fetch(`${API_URL}${path}`,{...init,headers});if(response.status===401&&await refresh()){headers.set('Authorization',`Bearer ${tokens!.accessToken}`);response=await fetch(`${API_URL}${path}`,{...init,headers});}return await parse(response) as T;}
export {API_URL};
