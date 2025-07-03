import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverCheckinPage } from './driver-checkin.page';

const routes: Routes = [
  {
    path: '',
    component: DriverCheckinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverCheckinPageRoutingModule {}
