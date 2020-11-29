import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => 
          import('./modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./modules/about/about.module').then(m=>m.AboutModule)
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./modules/users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./modules/account/account.module').then(m => m.AccountModule)
      },
      {
        path: 'review',
        loadChildren: () =>
          import('./modules/review/review.module').then(m => m.ReviewModule)
      },
      {
        path: 'write',
        loadChildren: () =>
          import('./modules/write/write.module').then(m => m.WriteModule)
      },
      {
        path: 'tags',
        loadChildren: () =>
          import('./modules/tags/tags.module').then(m => m.TagsModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
