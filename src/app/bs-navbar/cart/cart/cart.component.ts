import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { ShoppingCart } from 'src/app/common/model/shopping-cart';
import { ShoppingCartItem } from 'src/app/common/model/shopping-cart-item';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  count?:number=0;
  items:ShoppingCartItem[]=[]
  cart:ShoppingCart={items:this.items};
  subscription?:Subscription;
  cardIdExist:boolean=false;

  constructor(private shoppingCartService:ShoppingCartService,private appComponent:AppComponent) {      
    
  }
  

  ngOnInit(){

    this.appComponent.cartValue().subscribe(cart=>{
      this.cart=cart;
      this.count=0
      for(let productId in cart.items){
        this.count = cart.items[productId].quantity+this.count;
      }
    })
    
    
    // (await this.shoppingCartService.getTotalCountofItems()).subscribe(
    //   object =>{console.log("inside cart");
    //              this.count = object.valueOf()
    //             }
    // )
   
  }

}
