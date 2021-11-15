import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { ProductModel } from 'src/app/common/model/product-model';
import { take } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ShoppingCart } from 'src/app/common/model/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {  

  private cardIdStatus = new BehaviorSubject(false);
  getcardIdStatus = this.cardIdStatus.asObservable();

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

  getTotalItems(){
    var subject1 = new Subject<number>();
    let cartId = localStorage.getItem('cartId');
    if(cartId){
      this.db.object('/shopping-carts/'+cartId).valueChanges().subscribe((cart:any)=>{
        if(cart){
          let count=0;
          for(let productId in cart.items){
            count = cart.items[productId].quantity+count;
          }
          console.log("inside getTotal ->"+count);
          
          subject1.next(count);
          
        }
      });
    }
    return subject1;
  }

  async getTotalCountofItems(cardIdExist?:boolean):Promise<Subject<number>>{
    var subject = new Subject<number>();
    
    
    (await this.getCart()).subscribe(cart=>{
      if(cart){
        let count=0;
        for(let productId in cart.items){
          count = cart.items[productId].quantity+count;
        }
        console.log("inside getTotal");
        
        subject.next(count);
        
      }
    });
    return subject;
  }

  private async getOrCreateCart(){
    let cartId = localStorage.getItem('cartId');
    try {
      if(!cartId){

        let result = await this.createCart()
        if(result.key){
          this.cardIdStatus.next(true);
          console.log(this.cardIdStatus.value+" from getOrCreate");
          
          localStorage.setItem('cartId',result.key ? result.key:'');
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
