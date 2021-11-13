import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductModel } from '../model/product-model';
import { ShoppingCart } from '../model/shopping-cart';
import { CategoryService } from '../services/category/category.service';
import { ProductService } from '../services/product/product.service';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {

  products?:ProductModel[]=[];
  filteredProducts?:ProductModel[]=[];
  subscription?:Subscription;
  subscription2?:Subscription;
  categories$:any;
  categoryParam?:string;
  cart?:any;

  constructor(private productService:ProductService,
              private categoryService:CategoryService,
              private activatedRoute:ActivatedRoute,
              private shoppingCartService:ShoppingCartService) {
    this.getAllProduct();
    this.getCategories();

    
  }

  getCategories(){
    this.categories$ = this.categoryService.getCategories();
  }


  getAllProduct(){
    this.subscription = this.productService.getAll().snapshotChanges().subscribe(
      objectArray=>{
        objectArray.forEach(x=>{
            let product:ProductModel;
            product = x.payload.val() as ProductModel;
            product.key =x.key as string;
            this.products?.push(product)
          });
        this.activatedRoute.queryParamMap.subscribe(param=>{
            this.categoryParam = param.get('category') as string;
            this.filteredProducts = this.categoryParam ? this.products?.filter(p=>p.Category === this.categoryParam):this.products;
          })        
      },
      error =>alert("Failed to load products")
    );
  }

  getQuantity(product:ProductModel){
    if(!this.cart) return 0;
    let item = this.cart.items[product.key as string];
    return item ? item.quantity : 0;
  }

  addToCart(product:ProductModel,num?:number){
    this.shoppingCartService.addToCart(product,num); 
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscription2?.unsubscribe();
  }

  async ngOnInit() {
    this.subscription2 = (await this.shoppingCartService.getCart()).subscribe(
      cart =>{
        this.cart = cart;
      }
    );  
  }

}
