import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { ProductModel } from 'src/app/model/product-model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  

  constructor(private db:AngularFireDatabase) { }

  private createCart() {
    return this.db.list('/shopping-carts').push(
      {dateCreated: new Date().getTime()}
    );
  }

  async getCart(){
    let cartId = await this.getOrCreateCart();
    return this.db.object('/shopping-carts/'+cartId).valueChanges();
  }

  getItem(cartId:string,productKey:string){
    return this.db.object('/shopping-carts/'+cartId+'/items/'+productKey);
  }

  private async getOrCreateCart(){
    let cartId = localStorage.getItem('cartId');
    try {
      if(!cartId){

        let result = await this.createCart()
        if(result.key){
          localStorage.setItem('cartId',result.key ? result.key:'');
          return result.key;
        }else throw new Error("Failed to Create a cart");

      }
      return cartId;
    } catch (error) {
      return error;
    }
    
  }

  async addToCart(product:ProductModel){
    let cartId = await this.getOrCreateCart();

    let items$ = this.getItem(cartId as string,product.key as string);

    items$.snapshotChanges().pipe(
      take(1)
    ).subscribe(
      (item:SnapshotAction<any>)=>{

        items$.update(  {product:product , quantity: item.payload.exists()? item.payload.val().quantity + 1 : 1}  )
      }
    )

  }

  
}
