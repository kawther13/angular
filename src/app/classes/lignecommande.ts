import { Article } from "./article";
import { Commande } from "./commande";

export class Lignecommande {
	 id_ordDetails:number;
		
	  quantity:number;
		 totalPrice:number
		// unitPrice :number;
		   commande:Commande
		     article:Article;
}
