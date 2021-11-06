import { Component, OnInit } from '@angular/core';
import { AngularFireList, SnapshotAction } from '@angular/fire/database';
import { CategoryService } from 'src/app/services/category/category.service';
import { map } from 'rxjs/operators';
import { Form, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  keys:SnapshotAction<unknown>[]=[]
  categories$;
  constructor(private categoryService:CategoryService,private productService:ProductService) { 
    this.categories$ = this.categoryService.getCategories();
  }

  save(formData:any){
    console.log(formData.value);
    this.productService.addProduct(formData.value);
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
  }

}
