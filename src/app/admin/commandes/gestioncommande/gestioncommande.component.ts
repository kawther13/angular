import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/classes/article';
import { Client } from 'src/app/classes/client';
import { Commande } from 'src/app/classes/commande';
import { Lignecommande } from 'src/app/classes/lignecommande';
import { ArticleService } from 'src/app/services/article.service';
import { ClientService } from 'src/app/services/client.service';
import { CommandeService } from 'src/app/services/commande.service';
import { LignecommandeService } from 'src/app/services/lignecommande.service';

@Component({
  selector: 'app-gestioncommande',
  templateUrl: './gestioncommande.component.html',
  styleUrls: ['./gestioncommande.component.css']
})
export class GestioncommandeComponent implements OnInit{
   lignecommande: Lignecommande=new Lignecommande();
    articleList: Article[]=[];
    ligneCmdList: Lignecommande[]=[];
    isFirstLoad: boolean=true;
    id: number;
    commande: Commande={
        id: 0,
        orderDate: '',
        tva: 0,
        totalprix: 0,
        valide: false,
        novalider: false,
        enattente: true,
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
          valide: false,
        novalider: false,
        enattente: true,
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
constructor(private router:Router, private route:ActivatedRoute,private artService:ArticleService , private commandeService:CommandeService ,private clientService:ClientService , private ligneCommandeService:LignecommandeService){}

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
      allPageInfo(){
		
	  }
      addLgCommande(form:NgForm){
		 console.log(form.value.article);
		 //form.value.article=this.
	 	  this.ligneCommandeService.saveligneCommande(this.lgcmd,this.id).subscribe(
			  (data:Lignecommande)=>{
				  console.log(data)
				 // this.lgcmd.totalPrice=this.lgcmd.article.prixArticle*this.lgcmd.quantity
					if(data.quantity!=0){
					 window.alert("ligne commande jouter avec success ")
					 window.location.reload();
					}else{
						window.alert("les stock de cette article est vide")
						window.location.reload();
					}
					
			  }
		   )
	 }
	   
	  findByID(idcmd:number){
		  this.ligneCommandeService.getligneCommande(idcmd).subscribe( 
			  (data:Lignecommande)=>{
				  console.log(data)
				  this.lgcmd=data;
			  }
		  )
	  }
	   delete(id:number){
		  this.ligneCommandeService.deleteligneCommande(id).subscribe( 
			  (data)=>{
				  console.log(data)
 					if(data==null){
						 window.alert("ligne commande numero "+id+"Supprimer")
 						  window.location.reload();
 					 }
 			  }
		  )
	  }
	  activerCommande(id:number){
		  this.commandeService.validerCommande(id).subscribe (
			  (data:Commande)=>{
				  console.log(data);
				  		  this.router.navigate(['/facture',{id}])

			  }
		  )
		  //this.router.navigate(['/facture',{id}])
	  }
	   arreterCommande(id:number){
		  this.commandeService.arreterCommande(id).subscribe (
			  (data:Commande)=>{
				  console.log(data);
				  		  this.router.navigate(['/devis'])

			  }
		  )
		  //this.router.navigate(['/facture',{id}])
	  }
	  gotToFacture(id:number){
		  this.router.navigate(['/facture',{id}])
	  }
}
