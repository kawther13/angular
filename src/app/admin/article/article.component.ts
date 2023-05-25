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
ajouterArticle(form:NgForm){
	this.artService.addArticles(this.article).subscribe( 
		(data:Article)=>{
			console.log(data)
			this.allArticle();
			form.resetForm();
		}
	 )
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
