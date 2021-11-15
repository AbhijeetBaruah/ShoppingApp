import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ShoppingCartService } from './services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ShoppingApp';

  private cart: Subject<any> = new Subject();
  constructor(private shoppingCartService:ShoppingCartService){}

  cartValue(val?:number){
    if(val==1)
      this.init();
    return this.cart.asObservable();
  }

  private async init(){
    (await this.shoppingCartService.getCart()).subscribe(cart=>this.cart.next(cart))
    return this.cart;
  }

  ngOnInit() {
    
  }
}
