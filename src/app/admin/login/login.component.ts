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
  message = '';
  isLoginDisabled = false;
  loginAttempts = 0;
  maxLoginAttempts = 3;
  timeUntilLogin =  0;

  constructor(private router: Router, private adminService: AdminService, private authAdmin: AdminAuthService) {}

  ngOnInit(): void {
    const loginAttemptsString = localStorage.getItem('loginAttempts');
    this.loginAttempts = loginAttemptsString ? parseInt(loginAttemptsString, 10) : 0;

    const blockExpirationString = localStorage.getItem('loginBlockExpiration');
    const blockExpiration = blockExpirationString ? parseInt(blockExpirationString, 10) : 0;
    const timeLeft = Math.max(0, Math.floor((blockExpiration - Date.now()) / 1000));

    if (this.loginAttempts >= this.maxLoginAttempts && timeLeft > 0) {
      this.isLoginDisabled = true;
      this.timeUntilLogin = timeLeft;
      setInterval(() => {
        this.timeUntilLogin = Math.max(0, this.timeUntilLogin - 1);
      }, 1000);
    }
  }

  login(form: NgForm) {
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
        if (error.status === 401) {
           window.alert("Vous n'avez pas les droits d'accès")

          }
          })

		  

  }

 
}