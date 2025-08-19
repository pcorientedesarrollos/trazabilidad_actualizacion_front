import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class JwtService {

    constructor() { }

    setToken(token: string, usuario: string) {
        const encryptedToken = btoa(token);
        localStorage.setItem('token', encryptedToken);
        localStorage.setItem('usuario', usuario);
    }

    getUser() {
        return localStorage.getItem('usuario');
    }

    getToken() {
        return localStorage.getItem('token');

    }
    deleteToken(){
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
    }

}