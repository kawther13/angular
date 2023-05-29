import { Component ,OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Article } from 'src/app/classes/article';
import { Categories } from 'src/app/classes/categories';
import { ArticleService } from 'src/app/services/article.service';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent  implements OnInit{
 
	listArticle: Article[];
    article: Article={
        id: 0,
        nomArticle: '',
        descriptionArticle: '',
        prixArticle: 0,
        qteArt: 0,
        categorieArticle: {
			 id: 0,
        nomCat: '',
        etat: true
		}
			
    };
    catList: Categories[];
    articleupdate: Article={
        id: 0,
        nomArticle: '',
        descriptionArticle: '',
        prixArticle: 0,
        qteArt: 0,
        categorieArticle: {
			 id: 0,
        nomCat: '',
        etat: true
        }
    };
	nomarticleError: string;
	PrixError: string;
	qtError: string;
	constructor(private artService:ArticleService,private catService:CategorieService){}
    ngOnInit(): void {
	this.allArticle();
	this.getAllCategories();
    }
    allArticle() {
	this.artService.getAllArticle().subscribe( 
		(data:Article[])=>{
			this.listArticle=data;
		}
	)
    }
	nonNumericValidator(value: string): boolean {
		const regex = /^[^0-9]+$/; // Regular expression to match non-numeric characters
		return regex.test(value);
	  }
ajouterArticle(form:NgForm){
	const inputValue = form.value.nomArticle;
    if (!this.nonNumericValidator(inputValue)) {
		this.nomarticleError='nom d"article pas numerique ';
     }else
	if(form.value.nomArticle==''){
		this.nomarticleError=''
		this.nomarticleError="NOM ARTICLE OBLIGATOURE ET NON NUMERIQUE  ";
	} else
	if(form.value.prixArticle <=0){
		this.nomarticleError=''

		this.PrixError="Prix obligatoire et positife";
	}else
	if(form.value.qteArt  <=0){
		this.PrixError="";
		this.qtError="quantité obligatoire et positife";
	}else{
	/* && form.value.prixArticle <=0 && form.value.descriptionArticle=='' && form.value.qteArt <=0 
	&& form.value.categorieArticle ==''){

		this.passwordnotvalid="Mot de passe non valide"
} */
	this.artService.addArticles(this.article).subscribe( 
		(data:Article)=>{
			console.log(data)
			
			this.allArticle();
			form.resetForm();
		}
	 )
	}
}
   getAllCategories() {
		this.catService.getAllCat().subscribe( 
			(data:Categories[])=>{
				this.catList=data;
			}
		)
    } 
    
    
	findById(id:number){
		this.artService.getArticleById(id).subscribe( 
			(data:Article)=>{
				console.log(data)
				this.article=data;
			}
		)
	}
	deleteArticle(id:number){
					

		this.artService.deleteArticleById(id).subscribe(
			(data)=>{
				this.allArticle()						
				window.alert('article a ete supprimer ');
				
			}
		 )
	}
}
