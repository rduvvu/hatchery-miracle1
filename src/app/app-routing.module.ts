import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // {
  //   path: '',
  //   loadChildren: () => import('./login/login/login.module').then(m => m.LoginPageModule), pathMatch: 'full'
  // },
  {
    path: 'login',
    loadChildren: () => import('./login/login/login.module').then(m => m.LoginPageModule)
  },  {
    path: 'driver-registration',
    loadChildren: () => import('./Home/pages/driver-registration/driver-registration.module').then( m => m.DriverRegistrationPageModule)
  },
  {
    path: 'driver-checkin',
    loadChildren: () => import('./Home/pages/driver-checkin/driver-checkin.module').then( m => m.DriverCheckinPageModule)
  },
  {
    path: 'owner-dashboard',
    loadChildren: () => import('./Home/pages/owner-dashboard/owner-dashboard.module').then( m => m.OwnerDashboardPageModule)
  },
  {
    path: 'owner-login',
    loadChildren: () => import('./Home/pages/owner-login/owner-login.module').then( m => m.OwnerLoginPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
