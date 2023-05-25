import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categories } from 'src/app/classes/categories';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
    catList: Categories[]=[];
    category:Categories={
        id: 0,
        nomCat: '',
        etat: true
    }
    message: string;
    etatchange:boolean
    categoryUpdate: Categories ={
        id: 0,
        nomCat: '',
        etat: true
    };
    validMesg: string;
	constructor(private catService:CategorieService){}
    ngOnInit(): void {
		this.getAllCategories();
    }
    getAllCategories() {
		this.catService.getAllCat().subscribe( 
			(data:Categories[])=>{
				this.catList=data;
			}
		)
    }
    ajouterCat(form:NgForm){
		this.catService.ajouterCat(this.category).subscribe( 
			(data:Categories)=>{
				console.log(data);
				if(data==null){
					this.message='Un champs manquante'
					form.resetForm();
				}else{
					this.message='categories ajouter avec success'
					form.resetForm();
				}
					this.getAllCategories();
			}
		)
	}
updateCat(id:number){
	this.catService.getCatById(id).subscribe( 
		(data:Categories)=>{
			console.log(data)
			this.categoryUpdate=data;
			
		}
	)
}
updateCategory(form:NgForm){
	this.catService.ajouterCat(this.categoryUpdate).subscribe( 
			(data:Categories)=>{
				console.log(data);
				if(data==null){
					this.message='categories exist deja'
				}else{
					this.message='categories ajouter avec success'
				}
					this.getAllCategories();
			}
		)
}
reset(form:NgForm){
	form.resetForm();
}
changeEtat(id:number){
	this.catService.deleteCatById(id).subscribe( 
		(data:Categories)=>{
			console.log(data);
		//	this.category=data;
			if(data !== null && data.etat==true){
				window.alert('Categorie Activer')
			}
			if(data !== null && data.etat==false){
				window.alert('Categorie Desactiver')
			}
			this.getAllCategories()
		}
	)
}
findById(id:number){
	this.catService.getCatById(id).subscribe( 
		(data:Categories)=>{
			console.log(data);
			//this.category=data;
			
			
		}
	)
}
}
