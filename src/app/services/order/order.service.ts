import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Consumer } from 'src/app/model/consumer';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase,private shoppingCartService:ShoppingCartService) { }

  async storeOrder(consumerOrder:Consumer){
    let order = await this.db.list("/orders").push(consumerOrder);
    if(order.key){
      this.shoppingCartService.clearCart();
      return order;
    }else{
      throw new Error("Failed");
    }
      
  }

}
