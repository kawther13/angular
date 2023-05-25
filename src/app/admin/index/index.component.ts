import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/classes/client';
import { Commande } from 'src/app/classes/commande';
import { ClientService } from 'src/app/services/client.service';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent  implements OnInit{
    totalPrix: number;
    commandeList: Commande[];
    commandeListAnnuler: Commande[];
    clientList: Client[];
	constructor(private commandeService:CommandeService,private clientService:ClientService){}
    ngOnInit(): void {
		this.commandeService.totla().subscribe( 
			(data:number)=>{
				console.log(data)
				this.totalPrix=data;
			}
		)
		this.AllCommandes()
		this. AllCmdAnnuler();
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
  public AllCmdAnnuler(){
	 this.commandeService.getAlldevis().subscribe(
		 (data:Commande[])=>{
			 console.log(data)
			 this.commandeListAnnuler=data;
		 }
	  )
 }
     allClient() {
this.clientService.getAllClient().subscribe( 
	(data:Client[])=>{
		this.clientList=data;
	}
)
    }
}
