import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private db:AngularFireDatabase) { }
  
  addProduct(value: any) {
    return this.db.list("/Products").push(value);
  }

  
}
