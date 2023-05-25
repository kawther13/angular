import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/classes/client';
 import { Commande } from 'src/app/classes/commande';
import { ClientService } from 'src/app/services/client.service';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit {
    commandeList: Commande[];
    commande: Commande={
        id: 0,
        orderDate: "",
        tva: 0,
        totalprix: 0,        enattente:true,novalider:false,valide:false,

          client: {
			id:0,
			nom:'',
			prenom:'',
			adresse:'',
			numTel:'',
			email:''
		},
      ligneCommandes: []
    };
    clientList: Client[];
 
  constructor(private commandeService:CommandeService ,private clientService:ClientService, private router:Router ) { }

  ngOnInit() {
    this.AllCommandes();
     this.allClient();
  } 
 public AllCommandes(){
	 this.commandeService.getAlldevis().subscribe(
		 (data:Commande[])=>{
			 console.log(data)
			 this.commandeList=data;
		 }
	  )
 }
  
 goToLignCommande(id:number){
	this.router.navigate(['/gestioncommande',{id}]) 
 }
  allClient() {
this.clientService.getAllClient().subscribe( 
	(data:Client[])=>{
		this.clientList=data;
	}
)
    }
 findById(id:number){
	 this.commandeService.getCommande(id).subscribe( 
		 (data:Commande)=>{
			 this.commande=data
			 console.log(data)
		 }
	 )
 }
 delete(id:number){
	 this.commandeService.deleteCommande(id).subscribe( 
		 (data)=>{
			 console.log(data)
			 window.alert("Commande Numero "+id+"Supprimer")
			 this.AllCommandes();
		 }
	 )
 }
 getInfo(id:number){
	 this.router.navigate(['/gestioncommande',{id}])
 }
}

