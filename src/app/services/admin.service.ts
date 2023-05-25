import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../classes/Utilisateur';
import { AdminAuthService } from './admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
PATH_APP="http://localhost:8080/pfe"
  constructor(private httpClient:HttpClient,private adminAuthService:AdminAuthService) { }
  requestHeader = new HttpHeaders({
	   
		   "No-Auth":"True" 
	   }
  )
  public loginAdmin(loginData:any):Observable<any>{
	  return this.httpClient.post<any>(`${this.PATH_APP+"/login"}`,loginData,{headers:this.requestHeader})
  }
  public rolesMatch(allowedRoles:any):boolean{
	 let isMatch=false;
	 const adminRoles:any=this.adminAuthService.getRoles();
	 if(adminRoles != null && adminRoles){
		 for(let i=0 ; i<adminRoles.length; i++){
			 for(let j=0;j<allowedRoles.length;j++){
				if(adminRoles[i].nomroles === allowedRoles[j]){
					 isMatch=true;
				 return isMatch;
				}else{
					return isMatch;
				}
				
			 }
		 }
		 
	 }
	 return isMatch;
	 }
	  
 public getUser(email:string):Observable<Utilisateur>{
	   return this.httpClient.get<Utilisateur>(`${this.PATH_APP+"/findbyEmail/"+email}`)
   }
 
}
