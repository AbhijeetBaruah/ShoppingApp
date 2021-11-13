import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCart } from 'src/app/model/shopping-cart';
import { ShoppingCartItem } from 'src/app/model/shopping-cart-item';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  count:number=0;
  items:ShoppingCartItem[]=[]
  cart:ShoppingCart={items:this.items};
  subscription?:Subscription

  constructor(private shoppingCartService:ShoppingCartService) { 
    
  }
  

  async ngOnInit(){
   (await this.shoppingCartService.getTotalCountofItems()).subscribe(
     object =>{
       this.count = object.valueOf()
     }
   )
  }

}
