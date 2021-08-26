import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservacionPage } from './reservacion.page';

const routes: Routes = [
  {
    path: '',
    component: ReservacionPage
  },
  {
    path: 'confirmada',
    loadChildren: () => import('./confirmada/confirmada.module').then( m => m.ConfirmadaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservacionPageRoutingModule {}
