import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ProductModel } from 'src/app/model/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private db:AngularFireDatabase) { }
  
  addProduct(value: any) {
    return this.db.list("/Products").push(value);
  }

  updateProduct(id:any,product:ProductModel){
    
    return this.db.object("/Products/"+id).update(product)
  }

  delete(id: string) {
    return this.db.object("/Products/"+id).remove();
  }

  getAll(){
    return this.db.list("/Products");
  }

  get(productId:string){
    return this.db.object("/Products/"+productId);
  }

  
}
