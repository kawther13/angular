import {Client} from './client'
export interface Commande {
		 
        id:number;
    orderDate:string;  
  tva:number;
   totalprix:number;
   valide:boolean;novalider:boolean; enattente:boolean
   client:Client;
 ligneCommandes:[]
}
