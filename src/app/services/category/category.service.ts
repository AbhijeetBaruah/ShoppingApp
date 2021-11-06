import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) { 
  }

  getCategories(){
    return this.db.list('/Categories',fun=>fun.orderByChild('name')).snapshotChanges();
  }
}
