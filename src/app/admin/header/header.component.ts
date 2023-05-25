import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	constructor(private router:Router,public adminService:AdminService,private route:ActivatedRoute,
private authAdmin:AdminAuthService){}
admin:any
    ngOnInit(): void {
		
   }
   public loginOrNot(){
	return this.authAdmin.isLoggedIn();
}
public logout(){
	this.router.navigate(['/login'])
	window.alert("Au revoir")
	return this.authAdmin.clear();
	
}
}
