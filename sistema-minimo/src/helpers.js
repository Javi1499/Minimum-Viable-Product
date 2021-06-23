import axios from "axios";

export function setToken(token) {
    localStorage.setItem('token', token);
}

export function getToken(){
    return localStorage.getItem('token');
}
export function deleteToken(){
    localStorage.removeItem('token');

}
export function initAxiosIntterceptos(){
 axios.interceptors.request.use(config=>{
     const token = getToken();
     if(token){
         config.headers.authorization = token
         return config;
     } else{
         return config;
     }
 })
}