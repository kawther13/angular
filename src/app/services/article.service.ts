import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../classes/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

PATH_APP="http://localhost:8080/pfe/article"
  constructor(private httpClient:HttpClient) { }
  
  public getAllArticle():Observable<Article[]>{
	  return this.httpClient.get<Article[]>(`${this.PATH_APP+"/all"}`)
  }
  public addArticles(article:Article):Observable<Article>{
	  return this.httpClient.post<Article>(`${this.PATH_APP+"/save"}`,article)
  }
   public getArticleById(id:number):Observable<Article>{
	  return this.httpClient.get<Article>(`${this.PATH_APP+"/byId/"+id}`)
  }
    public deleteArticleById(id:number)
    {
	  return this.httpClient.delete(`${this.PATH_APP+"/delete/"+id}`)
  }
}
