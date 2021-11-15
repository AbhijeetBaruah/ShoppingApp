import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { StringLiteralLike } from 'typescript';
import { AuthService } from '../auth/auth-service/auth.service';
import { Consumer } from '../common/model/consumer';
import { ShoppingCartItem } from '../common/model/shopping-cart-item';
import { OrderService } from '../services/order/order.service';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy {

  cartSubscription?:Subscription;
  consumerOrder:Consumer = {} as Consumer;
  item:ShoppingCartItem = {} as ShoppingCartItem;
  itemArray:any[]=[];
  sum:number=0;
  user?:string;

  constructor(private shoppingCartService:ShoppingCartService,
              private orderService:OrderService,
              private route:Router,
              private authService:AuthService) {

  }
  ngOnDestroy() {
    this.cartSubscription?.unsubscribe();
  }

  async ngOnInit(){
    this.cartSubscription=(await this.shoppingCartService.getCart()).subscribe(
      cartObject=>{
        if(cartObject){
          //this.cart=cartObject;
          for(let productId in cartObject.items){
            this.item = cartObject.items[productId]
            this.sum = this.sum+ cartObject.items[productId].quantity*parseInt(cartObject.items[productId].product.Price as string);
            this.itemArray.push(this.item);
          }             
        }
      }
    )

    this.authService.getUser().pipe(take(1)).subscribe(
      authObj=>{
        this.user = authObj?.email as string;
      }
    )
  }

  async save(form:any){
    this.consumerOrder=form;
    this.consumerOrder.OrderTime = new Date().getTime();
    this.consumerOrder.user = this.user as string;
    this.consumerOrder.OrderCompleted=false;
    if(this.itemArray.length>0 && this.sum>0){
      this.consumerOrder.items = this.itemArray;
      this.consumerOrder.TotalPrice = this.sum;
      let order= await this.orderService.storeOrder(this.consumerOrder);

      if(order.key){
        this.route.navigate(['/order-success',order.key]);
      }
    }
    else
      return;
  }
}
