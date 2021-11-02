import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageOrdersComponent } from './admin/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { LoginComponent } from './auth/login/login.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'products',component:ProductsComponent},
  {path:'check-out',component:CheckOutComponent},
  {path:'order-success',component:OrderSuccessComponent},
  {path:'shopping-cart',component:ShoppingCartComponent},
  {path:'login',component:LoginComponent},
  {path:'my/orders',component:MyOrdersComponent},
  {path:'admin/products',component:ManageProductsComponent},
  {path:'admin/orders',component:ManageOrdersComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
