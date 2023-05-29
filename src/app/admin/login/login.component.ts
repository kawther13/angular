import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   notvalid: string;
  passwordnotvalid: string;
  message: string;
  

  constructor(private router: Router, private adminService: AdminService, private authAdmin: AdminAuthService) {}

  ngOnInit(): void {
    
  }
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{2,}$/;
    return emailPattern.test(email);
  }
  login(form: NgForm) {
  if (!this.validateEmail(form.value.username) ){
	    this.notvalid = 'Adresse e-mail non valide';
	 }if(form.value.password.length<5) {
    
      		this.passwordnotvalid="Mot de passe non valide"
}
   this.adminService.loginAdmin(form.value).subscribe(
      (data: any) => {
        this.authAdmin.setRoles(data.utilisateur.roles);
        this.authAdmin.setToken(data.token);
        if(data.utilisateur.roles[0].nomRole='ADMIN'){
			this.router.navigate(['/index'])
			window.alert('Bienvenue a votre Application gestion de ventes')
		}
       },
      (error: HttpErrorResponse) => {
        if (error.status == 401) {
this.message ="Vous n'avez pas les droits d'accès"          }
          })

		  

  }

 
}