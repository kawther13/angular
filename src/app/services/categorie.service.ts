import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from '../classes/categories';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
PATH_APP="http://localhost:8080/pfe/categories"
  constructor(private httpClient:HttpClient) { }
  
  public getAllCat():Observable<Categories[]>{
	  return this.httpClient.get<Categories[]>(`${this.PATH_APP+"/all"}`)
  }
   public ajouterCat(cat:Categories):Observable<Categories>{
	  return this.httpClient.post<Categories>(`${this.PATH_APP+"/save"}`,cat)
  }
   public getCatById(id:number):Observable<Categories>{
	  return this.httpClient.get<Categories>(`${this.PATH_APP+"/findByID/"+id}`)
  }
   public deleteCatById(id:number):Observable<Categories>{
	  return this.httpClient.delete<Categories>(`${this.PATH_APP+"/delete/"+id}`)
  }
}
