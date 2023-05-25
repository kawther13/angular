import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Commande } from '../classes/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
	PATH_APP= "http://localhost:8080/pfe/commande/"
  constructor(private httpClient:HttpClient) { }
  public getAllCommande():Observable<Commande[]>{
	  return this.httpClient.get<Commande[]>(`${this.PATH_APP+"all"}`)
  }
   public getAlldevis():Observable<Commande[]>{
	  return this.httpClient.get<Commande[]>(`${this.PATH_APP+"allDevis"}`)
  }
   public getAllCommandeByClient(idclt:number):Observable<Commande[]>{
	  return this.httpClient.get<Commande[]>(`${this.PATH_APP+"allbyClient/"+idclt}`)
  }
   public getCommande(id:number):Observable<Commande>{
	  return this.httpClient.get<Commande>(`${this.PATH_APP+"byId/"+id}`)
  }
    public deleteCommande(id:number) {
	  return this.httpClient.delete(`${this.PATH_APP+"delcommande/"+id}`)
  }
    public saveCommande(commande:Commande):Observable<Commande> {
	  return this.httpClient.post<Commande>(`${this.PATH_APP+"save"}`,commande)
  }
    public validerCommande(id:number):Observable<Commande> {
	  return this.httpClient.delete<Commande>(`${this.PATH_APP+"valider-Commande/"+id}`)
  }
     public arreterCommande(id:number):Observable<Commande> {
	  return this.httpClient.delete<Commande>(`${this.PATH_APP+"arreter-Commande/"+id}`)
  }
      public totla():Observable<number> {
	  return this.httpClient.get<number>(`${this.PATH_APP+"totalprix"}`)
  }
  }