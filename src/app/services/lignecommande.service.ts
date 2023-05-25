import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lignecommande } from '../classes/lignecommande';

@Injectable({
  providedIn: 'root'
})
export class LignecommandeService {
PATH_APP= "http://localhost:8080/pfe/lignCommande/"
  constructor(private httpClient:HttpClient) { }
  public getAllligneCommande(id:number):Observable<Lignecommande[]>{
	  return this.httpClient.get<Lignecommande[]>(`${this.PATH_APP+"all/"+id}`)
  }
   public getligneCommande(id:number):Observable<Lignecommande>{
	  return this.httpClient.get<Lignecommande>(`${this.PATH_APP+"byId/"+id}`)
  }
    public deleteligneCommande(id:number) {
	  return this.httpClient.delete(`${this.PATH_APP+"delete/"+id}`)
  }
    public saveligneCommande(lignCommande:Lignecommande,id:number):Observable<Lignecommande> {
	  return this.httpClient.post<Lignecommande>(`${this.PATH_APP+"save/"+id}`,lignCommande)
  }
  public calculTotal(id:number){
	  return this.httpClient.get<number>(`${this.PATH_APP+"calculTotal/"+id}`)
  }
}
