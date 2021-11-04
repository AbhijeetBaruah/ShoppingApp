import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/app';
import { UserService } from 'src/app/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  constructor(private afAuth:AngularFireAuth,private router:Router,private route:ActivatedRoute,private userService:UserService) { }

  login(){
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((user)=>{

      this.userService.save(user);
      
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || ''
      this.router.navigate(['/'+returnUrl],{ queryParams:{ returnUrl:returnUrl==''? false:true }})
      
    }).catch(error =>{
      alert("failed to login");
      console.log(error);
      this.router.navigate(['/'])
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
