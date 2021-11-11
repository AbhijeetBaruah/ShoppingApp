import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app'
import { Subscription } from 'rxjs/internal/Subscription';
import { map } from 'rxjs/operators';
import { AdminGuard } from '../admin/admin-guard/admin-guard.service';
import { AuthService } from '../auth/auth-service/auth.service';
import { CategoryService } from '../services/category/category.service';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit,OnDestroy {

  username?:firebase.User;
  private subscription: Subscription[] =[];
  isAdminVar:boolean=false;
  categories$:any;
  category:any;

  constructor(private authService:AuthService,private adminGuard:AdminGuard,
                      categoryService:CategoryService,private router:Router) { 

    this.subscription.push(authService.getUser().subscribe(user => this.username = user||undefined));

    this.subscription.push(this.adminGuard.canActivate().subscribe(x=>{
      this.isAdminVar = x||false;
    }));

    this.categories$ =categoryService.getCategories();

  }
  ngOnDestroy(): void {
    this.subscription.forEach(x=>x.unsubscribe())//always unsubscribe to subscription to firebase
  }

  ngOnInit(): void {
  }

  show(data:any){

    this.router.navigate([''],{queryParams:{category:data}})
    
  }
  logout(){
    this.authService.logout();
  }
}
