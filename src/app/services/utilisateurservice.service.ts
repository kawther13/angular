import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../classes/Utilisateur';
@Injectable({
  providedIn: 'root'
})
export class UtilisateurserviceService {
	
PATH_APP= "http://localhost:8080/pfe/utilisateur/"
  constructor(private httpClient:HttpClient) { }
public registerUtilisateur(utilisateur:Utilisateur):Observable<Utilisateur>{
	return this.httpClient.post<Utilisateur>(`${this.PATH_APP+"register"}`,utilisateur)
}
   public getUserById(id:number):Observable<Utilisateur>{
	  return this.httpClient.get<Utilisateur>(`${this.PATH_APP+"byId/"+id}`);
  }
  public getAllUtilisateur():Observable<Utilisateur[]>{
	  return this.httpClient.get<Utilisateur[]>(`${this.PATH_APP + "all"}`)
  }
}
