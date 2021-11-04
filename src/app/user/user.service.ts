import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import firebase from 'firebase/app'
import { Observable, of } from 'rxjs';
import { IUser } from '../model/user-model';
import { RoleData } from '../role-provider/roledata';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firebaseDatabase:AngularFireDatabase) { }

  save(userCredential:firebase.auth.UserCredential){
    this.firebaseDatabase.object('/users/'+userCredential.user?.uid).update(
      {
        name:userCredential.user?.displayName,
        email:userCredential.user?.email
      }
    ).catch(error=>{
      alert("Error in Saving User");
      console.log(error);
      
    });
  }

  checkUserRole():Observable<unknown>{
    
    let roleProvider:AngularFireObject<unknown> = this.firebaseDatabase.object('/RoleProvider/');
    
    return roleProvider.valueChanges();
  }

  get(uid?:string):AngularFireObject<IUser>{
    return this.firebaseDatabase.object('/users/'+uid)
  }
  //develop a functionality to fetch all the users
  getAllUser(){}

  //update the isAdmin by matching email address
  updateIsAdmin(){}
}
