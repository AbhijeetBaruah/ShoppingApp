import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product/product.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductModel } from 'src/app/common/model/product-model';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})


export class ManageProductsComponent implements OnInit,OnDestroy {


  filterTextChanged: Subject<string> = new Subject<string>();
  subscription:Subscription;
  products:ProductModel[]=[]
  product:ProductModel={};
  filteredProducts:ProductModel[]=[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private productService:ProductService) {

    this.subscription = this.productService.getAll().snapshotChanges().subscribe(
      array =>{
        this.products=[]
        array.forEach(x =>{
          
          this.product = x.payload.val() as ProductModel;
          this.product.key = x.key as string;
          this.products.push(this.product);

        })
        this.filteredProducts = this.products;
        this.dtTrigger.next();    
      }
    )
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {

  
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4,
      autoWidth:false,
      searching:false,
    
      columnDefs:[
        {
          targets:[2,3],
          orderable: false,
        }
      ],   
      
    };

    this.dtOptions.autoWidth=true
  }

  delete(id:any){
    console.log(id);
    
    if(confirm("Do you really want to delete it")){
      this.productService.delete(id).
      catch(error =>alert("failed to delete"));
    }
  }

  filter(query:string){
    if(this.filterTextChanged.observers.length ===0){
      this.filterTextChanged.pipe(
        debounceTime(500),
        distinctUntilChanged())
        .subscribe(
          filterQuery =>{
            
            this.filteredProducts = (filterQuery) ? this.products.filter(p=>p.Title?.toLowerCase().
                                                                                  includes(filterQuery.toLowerCase()))
                                                                         : this.products;            
  
          }
          
          
        )
    }
    this.filterTextChanged.next(query.trim());
    
  }


}
