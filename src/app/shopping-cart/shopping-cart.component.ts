import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../model/shopping-cart';
import { ShoppingCartItem } from '../model/shopping-cart-item';
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
  constructor(private shoppingCartService:ShoppingCartService) { }

  async ngOnInit() {
    this.subscription1 =(await this.shoppingCartService.getTotalCountofItems()).subscribe(
      object=>this.count=object.valueOf()
    )

    this.subscription2 = (await this.shoppingCartService.getCart()).subscribe(
                                cartObject =>{
                                  this.sum=0;
                                  this.productIds=[]
                                  this.cart=cartObject;
                                  if(this.cart){
                                    for(let productId in cartObject.items){
                                      this.productIds?.push(productId);
                                      this.sum = this.sum+ cartObject.items[productId].quantity*parseInt(cartObject.items[productId].product.Price as string);
                                    }
                                    this.cartItems = cartObject.items;
                                  }
                                }
                              )
                              

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
