import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { ProductModel } from 'src/app/common/model/product-model';
import { take } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ShoppingCart } from 'src/app/common/model/shopping-cart';

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

  async clearCart() {
    let cartId = await this.getOrCreateCart();
    this.db.object("shopping-carts/"+cartId+"/items/").remove()
    
  }

  async getCart():Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCart();
    return this.db.object('/shopping-carts/'+cartId).valueChanges() as Observable<ShoppingCart> ;
  }

  getItem(cartId:string,productKey:string){
    return this.db.object('/shopping-carts/'+cartId+'/items/'+productKey);
  }

  checkCartIdExistOnFirebase(cartId:any){
    var subject=new Subject()
    
     this.db.object('/shopping-carts/'+cartId).snapshotChanges().pipe(take(1)).subscribe(
       cart=>cart.payload.exists()?subject.next(true):subject.next(false)
     );
     return subject ;
  }

  private async getOrCreateCart(){
    let cartId = localStorage.getItem('cartId');
    let exist;
    try {     

      await this.checkCartIdExistOnFirebase(cartId).pipe(take(1)).toPromise().then(data=>exist=data);
      
      if(!exist){        

        let result = await this.createCart()
        if(result.key){
          localStorage.setItem('cartId',result.key);
          return result.key;
        }else throw new Error("Failed to Create a cart");

      }
      return cartId;
    } catch (error) {
      return error;
    }
    
  }

  async addToCart(product:ProductModel,num?:number){
    if(!num) num=1;

    let cartId = await this.getOrCreateCart();

    let items$ = this.getItem(cartId as string,product.key as string);

    items$.snapshotChanges().pipe(
      take(1)
    ).subscribe(
      (item:SnapshotAction<any>)=>{

        items$.update(  {product:product , quantity: item.payload.exists()? item.payload.val().quantity + num : 1}  )
      }
    )

  }

  async delete(product:ProductModel){
    let cardId= await this.getOrCreateCart();
    this.getItem(cardId as string,product.key as string).remove();
  }

  
}
