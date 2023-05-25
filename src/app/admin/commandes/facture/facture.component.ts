import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/classes/article';
import { Commande } from 'src/app/classes/commande';
import { Lignecommande } from 'src/app/classes/lignecommande';
import { ArticleService } from 'src/app/services/article.service';
import { ClientService } from 'src/app/services/client.service';
import { CommandeService } from 'src/app/services/commande.service';
import { LignecommandeService } from 'src/app/services/lignecommande.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
     id: number;
    commande: Commande={
        id: 0,
        orderDate: '',
        tva: 0,
        totalprix: 0,        enattente:true,novalider:false,valide:false,

        client: {
            id: 0,
            nom: '',
            prenom: '',
            adresse: '',
            email: '',
            numTel: ''
        },
        ligneCommandes: []
    };
    listLigneCommande: Lignecommande[];
lgcmd:Lignecommande={
    id_ordDetails: 0,
    quantity: 0,
    totalPrice: 0,
    commande: {
	     id: 0,
        orderDate: "",
        tva: 0,
        totalprix: 0,
        enattente:true,novalider:false,valide:false,
          client: {
			id:0,
			nom:'',
			prenom:'',
			adresse:'',
			numTel:'',
			email:''
		},
      ligneCommandes: []
  
     
	},
    article: new Article
}
    totalprix: any;
    articleList: Article[];
	constructor(private router:Router, 
					private route:ActivatedRoute,
					private artService:ArticleService ,
					 private commandeService:CommandeService 
					 ,private clientService:ClientService ,
					  private ligneCommandeService:LignecommandeService){}

    ngOnInit(): void {
 this.id=this.route.snapshot.params['id']  
 			console.log(this.id)
				 this.commandeService.getCommande(this.id).subscribe( 
					 (data:Commande)=>{
						 console.log(data)
						 this.commande=data;
						 this.lgcmd.commande.id=this.id;
					 this.ligneCommandeService.getAllligneCommande(this.commande.id).subscribe( 
					 (data:Lignecommande[])=>{
						 console.log(data)
						 this.listLigneCommande=data;
					 }
				 ) }
				 )
				
				 this.artService.getAllArticle().subscribe( 
		(data:Article[])=>{
			this.articleList=data;
		}
	)
     
     }

}
