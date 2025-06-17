import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./page/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import('./page/product-detail/product-detail.component').then(
            (m) => m.ProductDetailComponent
          ),
      },
      {
        path: 'card',
        loadComponent: () => import('./page/card/card.component').then((m) => m.CardComponent),
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./page/checkout/checkout.component').then((m) => m.CheckoutComponent),
      },
      {
        path: 'book-management',
        loadComponent: () =>
          import('./page/bookmanagement/bookmanagement.component').then(
            (m) => m.BookmanagementComponent
          ),
      },
      {
        path: 'author-management',
        loadComponent: () =>
          import('./page/authormanagement/authormanagement.component').then(
            (m) => m.AuthormanagementComponent
          ),
      },
      {
        path: 'order-management',
        loadComponent: () => {
          return import('./page/ordermanagement/ordermanagement.component').then(
            (m) => m.OrdermanagementComponent
          );
        },
      },
    ],
  },
  {
    path: 'account',
    loadChildren: () => import('@abp/ng.account').then((m) => m.AccountModule.forLazy()),
  },
  {
    path: 'identity',
    loadChildren: () => import('@abp/ng.identity').then((m) => m.IdentityModule.forLazy()),
  },
  {
    path: 'tenant-management',
    loadChildren: () =>
      import('@abp/ng.tenant-management').then((m) => m.TenantManagementModule.forLazy()),
  },
  {
    path: 'setting-management',
    loadChildren: () =>
      import('@abp/ng.setting-management').then((m) => m.SettingManagementModule.forLazy()),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
