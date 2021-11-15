import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/common/model/product-model';
import { ShoppingCart } from 'src/app/common/model/shopping-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'shopping-button',
  templateUrl: './shopping-button.component.html',
  styleUrls: ['./shopping-button.component.css']
})
export class ShoppingButtonComponent implements OnInit {

  @Input('product') product?:ProductModel;
  @Input('cart') cart?:any=[];

  constructor(private shoppingCartService:ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart(num:number){
    if(this.quantityChecker(num)) return;
    if(this.product)
      this.shoppingCartService.addToCart(this.product,num); 
  }

  getQuantity(){
    if(!this.cart) return 0;
    let item = this.cart.items[this.product?.key as string];
    return item ? parseInt(item.quantity) : 0;
  }

  private quantityChecker(num:number){
      if(this.getQuantity()<=1 && num<0) {
        if(confirm('Do you want to remove the product from cart?')){
          if(this.product){
            this.shoppingCartService.delete(this.product);
          }
          else
            alert("failed to delete");
        }
        return true;
      }
    return false;
  }

}
