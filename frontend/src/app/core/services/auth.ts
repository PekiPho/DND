import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    private apiUrl= 'http://localhost:3030/auth';


    register(username:string,password:string):Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/register`, {username,password}).pipe(
        tap(res => this.setSession(res.access_token))
      );
    }

    login(username:string,password:string) : Observable<any>{
      return this.http.post<any>(`${this.apiUrl}/login`, {username,password}).pipe(
        tap(res => this.setSession(res.access_token))
      );
    }

    private setSession(token:string): void{
      localStorage.setItem('access_token',token);   
    }

    logout():void{
      localStorage.removeItem('access_token');
    }

    isLoggedIn():boolean{
      return !!localStorage.getItem('access_token');
    }

    getToken(): string | null {
      return localStorage.getItem('access_token');
    }

    getCurrentUser():any{
      const token = this.getToken();
      if(!token) return null;
      return decodeToken(token);
    }
  
}

function decodeToken(token: string): any {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    let payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const pad = payload.length % 4;
    if (pad) payload += '='.repeat(4 - pad);
    return JSON.parse(atob(payload));
  } catch (e) {
    return null;
  }
}
