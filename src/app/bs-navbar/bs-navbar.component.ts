import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app'
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from '../auth/auth-service/auth.service';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit,OnDestroy {

  username?:firebase.User;
  subscription: Subscription;
  constructor(private authService:AuthService) { 
    this.subscription = authService.getUser().subscribe(user => this.username = user||undefined);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();//always unsubscribe to subscription to firebase
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }
}
