import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from 'src/app/classes/client';
import { Commande } from 'src/app/classes/commande';
import { ClientService } from 'src/app/services/client.service';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-cliens',
  templateUrl: './cliens.component.html',
  styleUrls: ['./cliens.component.css']
})
export class CliensComponent implements OnInit {
    clientList: Client[];
    client: Client={
        id: 0,
        nom: '',
        prenom: '',
        adresse: '',
        email: '',
        numTel: ''
    };
    message: string;
    cmds: Commande[];
   constructor(private clientService:ClientService,private cmdService:CommandeService){}
    ngOnInit(): void {
	this.allClient();
    }
    
    allClient() {
this.clientService.getAllClient().subscribe( 
	(data:Client[])=>{
		this.clientList=data;
	}
)
    }
    findById(id:number){
		this.clientService.getClient(id).subscribe( 
			(data:Client)=>
			{
				console.log(data)
				this.client=data;
			})
	}
deleteArticle(id:number){
	this.cmdService.getAllCommandeByClient(id).subscribe(
  (data: Commande[]) => {
    this.cmds = data;
    console.log(data);
    if (this.cmds.length == 0) {
      this.clientService.deleteClient(id).subscribe(
        () => {
          window.alert("Client supprimé");
          this.allClient();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      const commandeDescriptions = this.cmds.map((cmd) => cmd.id).join(", ");
      window.alert(
        `Ce client contient des commandes. Vous devez supprimer leurs commandes avant de pouvoir supprimer le client.\n\nCommandes associéesid Numero =>: ${commandeDescriptions}`
      );
    }
  },
  (error) => {
    console.error(error);
  }
);
	/*this.clientService.deleteClient(id).subscribe(data=>{
		console.log(data)
		window.alert("Client Supprimer")
	})*/
}
ajouterClient(form:NgForm){
	this.clientService.saveClient(this.client).subscribe( 
		(data:Client)=>{
			console.log(data)
			this.allClient()
			form.resetForm();
			if(data!=null){
				this.message="Client Ajouter Avec success"
				form.resetForm();
			}else{
				this.message="Client exist deja  "
				form.resetForm();
			}
		}
	)
}
}
