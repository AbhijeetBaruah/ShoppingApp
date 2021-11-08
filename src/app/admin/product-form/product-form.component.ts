import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from 'src/app/model/product-model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit,OnDestroy {

  
  categories$;
  id:any;
  product:ProductModel ={} as ProductModel;
  subscription?:Subscription;

  constructor(private categoryService:CategoryService,
              private productService:ProductService,
              private router:Router,
              private activatedRoute:ActivatedRoute) {
    
    

    this.categories$ = this.categoryService.getCategories();

    
  }


  save(formData:any){
    this.product = formData.value;
    if(this.id){
      this.updateProduct(this.product);
    }else{
      this.addProduct(formData.value);
    }    
  }

  updateProduct(product:ProductModel){
    this.productService.updateProduct(this.id,product).
    then(x=>
      this.router.navigate(['/admin/products'])
    ).
    catch(
      error =>alert("failed to update product")
    );
  }

  addProduct(formData:any){
    this.productService.addProduct(formData).
    then(x=>
      this.router.navigate(['/admin/products'])
    ).
    catch(
      error =>alert("failed to add product")
    );
  }
  //just to show the values on console
  show(){
    this.categories$.subscribe(
      x=>{
        x.forEach(y => console.log(y.payload.val()))        
      }
    )
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if(this.id){
      
      this.subscription = this.productService.get(this.id).snapshotChanges().subscribe(
        x=>{ 
          
          this.product = x.payload.val() as ProductModel;
        },
        error=>{
            console.clear();
            alert("cannot fetch data");
            console.log(error);
          }
        );

    }
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
