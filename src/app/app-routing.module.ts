import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin/admin-guard/admin-guard.service';
import { ManageOrdersComponent } from './admin/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AuthGuard } from './auth/auth-guard/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { RoleProviderComponent } from './role-provider/role-provider.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'products',component:ProductsComponent},
  {path:'shopping-cart',component:ShoppingCartComponent},
  {path:'login',component:LoginComponent},
  {path:'roleprovider',component:RoleProviderComponent},

  {path:'check-out',component:CheckOutComponent,canActivate:[AuthGuard]},
  {path:'order-success',component:OrderSuccessComponent,canActivate:[AuthGuard]},
  {path:'my/orders',component:MyOrdersComponent,canActivate:[AuthGuard]},
  {path:'admin/products',component:ManageProductsComponent,canActivate:[AuthGuard,AdminGuard]},
  {path:'admin/product/new',component:ProductFormComponent,canActivate:[AuthGuard,AdminGuard]},
  {path:'admin/orders',component:ManageOrdersComponent,canActivate:[AuthGuard,AdminGuard]},


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
