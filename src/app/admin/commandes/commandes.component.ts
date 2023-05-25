import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Client } from "src/app/classes/client";
import { Commande } from "src/app/classes/commande";
import { ClientService } from "src/app/services/client.service";
import { CommandeService } from "src/app/services/commande.service";

@Component({
  selector: 'app-list-comm',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {
    commandeList: Commande[];
    commande: Commande={
        id: 0,
        orderDate: "",
        tva: 0,        enattente:true,novalider:false,valide:false,

        totalprix: 0,
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
	 this.commandeService.getAllCommande().subscribe(
		 (data:Commande[])=>{
			 console.log(data)
			 this.commandeList=data;
		 }
	  )
 }
 addCommandes(form:NgForm){
	 this.commandeService.saveCommande(this.commande).subscribe( 
		 (data:Commande)=>{
			 console.log(data)			  
		 		this.AllCommandes();
		 		const id=data.id
		 		if(data!==null){
				 this.goToLignCommande(id)
 
				 }
 		 
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

