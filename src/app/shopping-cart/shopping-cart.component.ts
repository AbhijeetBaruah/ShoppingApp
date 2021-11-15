import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppComponent } from '../app.component';
import { ShoppingCart } from '../common/model/shopping-cart';
import { ShoppingCartItem } from '../common/model/shopping-cart-item';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit,OnDestroy {

  subscription1?:Subscription;
  subscription2?:Subscription;

  count:number=0;
  sum:number=0;
  productIds:any[]=[];
  cartItems:ShoppingCartItem[]=[];
  cart:any;
  constructor(private shoppingCartService:ShoppingCartService,private appComponent:AppComponent) { }

  async ngOnInit() {

    this.subscription1=this.appComponent.cartValue(1).subscribe(cart=>{
      this.cart=cart;
      this.productIds=[]
      this.count=0
      this.sum=0
      for(let productId in cart.items){
        this.count = cart.items[productId].quantity+this.count;
      }
      for(let productId in cart.items){
        this.productIds?.push(productId);
        this.sum = this.sum+ cart.items[productId].quantity*parseInt(cart.items[productId].product.Price as string);
      }
      this.cartItems = cart.items;
    })        

  }

  getPrice(productId:any){
    return this.cartItems[productId].quantity*parseInt(this.cartItems[productId].product.Price as string);
  }

  clearCart(){
    
    if(confirm("Sure to Clear the Cart?")){
      this.shoppingCartService.clearCart();
    }else{
      console.log("did not clear");
      
    }
  }

  ngOnDestroy(){
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
  }

}
