import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductModel } from '../model/product-model';
import { CategoryService } from '../services/category/category.service';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {

  products?:ProductModel[]=[];
  subscription?:Subscription;
  categories$:any;

  constructor(private productService:ProductService,private categoryService:CategoryService) {
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
        })
      },
      error =>alert("Failed to load products")
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    console.log(this.products);
    
  }

}
