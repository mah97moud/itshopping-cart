import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductComponent } from './product/product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';

const routes: Routes = [
  {path: '', component: ProductComponent},
  {path: 'product', component: ProductComponent , canActivate : [AuthGuardService]},
  {path: 'orders', component: MyOrdersComponent , canActivate : [AuthGuardService]},
  {path: 'admin/orders', component: AdminOrdersComponent , canActivate : [AuthGuardService, AdminAuthGuardService]},
  {path: 'admin/products', component: AdminProductsComponent , canActivate : [AuthGuardService, AdminAuthGuardService]},
  {path: 'admin/products/admin/products/:id', component: ProductFormComponent , canActivate : [AuthGuardService, AdminAuthGuardService]},  
  {path: 'admin/products/new', component: ProductFormComponent , canActivate : [AuthGuardService, AdminAuthGuardService]},    
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
