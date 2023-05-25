import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './admin/header/header.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './admin/index/index.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { CategoryComponent } from './admin/category/category.component';
import { ArticleComponent } from './admin/article/article.component';
import { CliensComponent } from './admin/cliens/cliens.component';
import { CommandesComponent } from './admin/commandes/commandes.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './admin/auth/auth.guard';
import { AuthInterceptor } from './admin/auth/auth.intercepter';
import { AdminService } from './services/admin.service';
import { GestioncommandeComponent } from './admin/commandes/gestioncommande/gestioncommande.component';
import { FactureComponent } from './admin/commandes/facture/facture.component';
import { DevisComponent } from './admin/devis/devis.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    CategoryComponent,
    ArticleComponent,
    CliensComponent,
    CommandesComponent,
    GestioncommandeComponent,
    FactureComponent,
    DevisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,FormsModule,MatGridListModule,MatCardModule
  ],
  providers: [
	  AuthGuard,{
		  provide:HTTP_INTERCEPTORS,
		  useClass:AuthInterceptor,
		  multi:true
		  
	  },
	  AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
