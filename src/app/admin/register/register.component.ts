import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/classes/Utilisateur';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { AdminService } from 'src/app/services/admin.service';
import { UtilisateurserviceService } from 'src/app/services/utilisateurservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
message = '';
    utilisateur: Utilisateur={
        idUtilisateur: 0,
        nom: '',
        prenom: '',
        adresse: '',
        email: '',
        password: ''
    };
 

  constructor(private router: Router, private utilisateurService: UtilisateurserviceService, private authAdmin: AdminAuthService) {}

  ngOnInit(): void {
   
  }

  register(form: NgForm) {
	 
   this.utilisateurService.registerUtilisateur(this.utilisateur).subscribe(
      (data: any) => {
  
        if(data == null){
 			window.alert('il ya un compte admin exist deja ')
		}else{
	       window.alert('votre  inscription passe  avec success')

			this.router.navigate(['/login']);
		}
       },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
           window.alert("Vous n'avez pas les droits d'accès")

          }
          })

		  

  }

}
