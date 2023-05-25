import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './admin/article/article.component';
import { AuthGuard } from './admin/auth/auth.guard';
import { CategoryComponent } from './admin/category/category.component';
import { CliensComponent } from './admin/cliens/cliens.component';
import { CommandesComponent } from './admin/commandes/commandes.component';
import { FactureComponent } from './admin/commandes/facture/facture.component';
import { GestioncommandeComponent } from './admin/commandes/gestioncommande/gestioncommande.component';
import { DevisComponent } from './admin/devis/devis.component';
import { IndexComponent } from './admin/index/index.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';

const routes: Routes = [
	    {path:"index",component:IndexComponent  },
		{path:"client",component:CliensComponent  },
	    {path:"devis",component:DevisComponent  },

		{path:"produit",component:ArticleComponent  },
		{path:"category",component:CategoryComponent  },
		{path:"commandes",component:CommandesComponent  },
		{path:"login",component:LoginComponent},
		{path:"register",component:RegisterComponent},
		{path:"gestioncommande",component:GestioncommandeComponent},
		{path:"facture", component:FactureComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
