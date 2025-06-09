import { LoginComponent, RegisterComponent } from '@abp/ng.account';
import { CardComponent } from '@abp/ng.theme.shared';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './page/admin/admin.component';
import { CheckoutComponent } from './page/checkout/checkout.component';
import { ProductDetailComponent } from './page/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./page/home/home.module').then(m => m.HomeModule),
  },

  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CardComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    component: AdminComponent,
    // canActivate: [AdminGuard],
    // children: [
    //   { path: 'books', component: AdminBooksComponent },
    //   { path: 'orders', component: AdminOrdersComponent }
    // ]
  },
  {
    path: 'account',
    loadChildren: () => import('@abp/ng.account').then(m => m.AccountModule.forLazy()),
  },
  {
    path: 'identity',
    loadChildren: () => import('@abp/ng.identity').then(m => m.IdentityModule.forLazy()),
  },
  {
    path: 'tenant-management',
    loadChildren: () =>
      import('@abp/ng.tenant-management').then(m => m.TenantManagementModule.forLazy()),
  },
  {
    path: 'setting-management',
    loadChildren: () =>
      import('@abp/ng.setting-management').then(m => m.SettingManagementModule.forLazy()),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
