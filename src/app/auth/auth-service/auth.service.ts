import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  constructor(private afAuth:AngularFireAuth,private router:Router) { }

  login(){
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((x)=>{
      
      this.router.navigate(['/'],{ queryParams:{login:true}})
      
    })
  }

  getUser(){
    return this.afAuth.authState;
  }

  logout(){
    this.afAuth.signOut();
    this.router.navigate(['/'])
  }
}
