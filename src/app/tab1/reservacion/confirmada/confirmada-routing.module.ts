import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmadaPage } from './confirmada.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmadaPageRoutingModule {}
