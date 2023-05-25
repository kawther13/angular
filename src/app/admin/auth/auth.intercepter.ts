import { HttpHandler, HttpEvent, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import {Observable, throwError } from "rxjs";
import {catchError} from "rxjs/operators";
import { AdminAuthService } from "src/app/services/admin-auth.service";
import { Injectable } from "@angular/core";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
constructor(private adminAuthService:AdminAuthService,private router:Router){
	
}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    { 
		const token = this.adminAuthService.getToken();
		if(req.headers.get("No-Auth")==="True"){
			return next.handle(req.clone())
		}
		
       
        if(token){
            req = this.addToken(req,token);
            console.log
        }
    return next.handle(req).pipe(
        catchError(
            (err:HttpErrorResponse)=>{
                console.log(err.status);
               
                if(err.status===401){
                    this.router.navigate(['/login'])
                } 
                return throwError ("someThing error") 
            }
        )
       )
      
       }
   
   
    

    private addToken(request:HttpRequest<any>, token:string){
        return request.clone(
            {
                setHeaders:{
                    Authorization :`Bearer ${token}` 
                }
            }
        );
    }
    }
    
    