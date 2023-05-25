import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../classes/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
PATH_APP= "http://localhost:8080/pfe/client/"
  constructor(private httpClient:HttpClient) { }
  public getAllClient():Observable<Client[]>{
	  return this.httpClient.get<Client[]>(`${this.PATH_APP+"all"}`)
  }
   public getClient(id:number):Observable<Client>{
	  return this.httpClient.get<Client>(`${this.PATH_APP+"byId/"+id}`)
  }
    public deleteClient(id:number) {
	  return this.httpClient.delete(`${this.PATH_APP+"delete/"+id}`)
  }
    public saveClient(client:Client):Observable<Client> {
	  return this.httpClient.post<Client>(`${this.PATH_APP+"save"}`,client)
  }
}
