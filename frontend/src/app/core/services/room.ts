import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthService } from "./auth";
import { first, firstValueFrom } from "rxjs";


@Injectable({
    providedIn: 'root',
})
export class RoomService{
    private http = inject(HttpClient);
    private authService = inject(AuthService);
    private apiUrl = 'http://localhost:3030/room';

    private getHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders().set('Authorization',`Bearer ${token}`);
    }

    async getAll():Promise<any[]>{
        return firstValueFrom( this.http.get<any[]>(this.apiUrl));
    }

    async getOne(id:number): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}/${id}`));      
    }

    async create(name:string,description:string,password?:string,maxPlayers?:number):Promise<any> {
        return firstValueFrom(this.http.post<any>(this.apiUrl, {name,description,password,maxPlayers}, {headers: this.getHeaders()}));
    }

    async join(id:number,password?: string): Promise<any>{
        return firstValueFrom(this.http.post<any>(`${this.apiUrl}/${id}/join`,{ password }, { headers: this.getHeaders() }));
    }

    async leave(id:number):Promise<any> {
        return firstValueFrom(this.http.post<any>(`${this.apiUrl}/${id}/leave`,{},{ headers: this.getHeaders() }))
    }
}