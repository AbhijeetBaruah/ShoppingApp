import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product/product.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  products$;
  constructor(private productService:ProductService) {
    this.products$=this.productService.getAll().snapshotChanges();
  }

  ngOnInit(): void {
  }

  delete(id:any){
    if(confirm("Do you really want to delete it")){
      this.productService.delete(id).
      catch(error =>alert("failed to delete"));
    }
  }

  filter(query:string){
    console.log(query);
    
  }
  show(product:any){
    console.log(product.key);
  }


}
