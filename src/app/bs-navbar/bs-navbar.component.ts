import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app'
import { Subscription } from 'rxjs/internal/Subscription';
import { map } from 'rxjs/operators';
import { AdminGuard } from '../admin/admin-guard/admin-guard.service';
import { AuthService } from '../auth/auth-service/auth.service';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit,OnDestroy {

  username?:firebase.User;
  private subscription: Subscription[] =[];
  isAdminVar:boolean=false;

  constructor(private authService:AuthService,private adminGuard:AdminGuard) { 

    this.subscription.push(authService.getUser().subscribe(user => this.username = user||undefined));

    this.subscription.push(this.adminGuard.canActivate().subscribe(x=>{
      this.isAdminVar = x||false;
    }));

  }
  ngOnDestroy(): void {
    this.subscription.forEach(x=>x.unsubscribe())//always unsubscribe to subscription to firebase
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }
}
