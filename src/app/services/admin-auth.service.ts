import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor() { }
  
  public setRoles(roles:[]){
	  localStorage.setItem("roles",JSON.stringify(roles))
  }
    public getRoles():[]{
	return  JSON.parse(localStorage.getItem('roles') as string);
  }
  public setToken(token:string){
	  localStorage.setItem("token",token)
  }
    public getToken(): string{
	return localStorage.getItem('token') as string;
  }

  clear(){
	  localStorage.clear();
  }
  isLoggedIn(){
	  return this.getRoles() && this.getToken();
  }
}
