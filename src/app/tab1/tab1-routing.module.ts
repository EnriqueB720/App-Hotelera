import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'lista',
    children: [
      {
        path: '',
        loadChildren: () => import('./lista/lista.module').then( m => m.ListaPageModule)
      },
      {
        path: ':hash',
        children: [
          {
            path: '',
            loadChildren: () => import('./lista/detalle/detalle.module').then( m => m.DetallePageModule)
          },
          {
            path: 'editar',
            loadChildren: () => import('./lista/detalle/editar/editar.module').then( m => m.EditarPageModule)
          },
          {
            path: 'reservacion',
            children:[
              {
                path: '',
                loadChildren: () => import('./reservacion/reservacion.module').then( m => m.ReservacionPageModule)
              },
              {
                path: 'confirmacion',
                loadChildren: () => import('./reservacion/confirmada/confirmada.module').then( m => m.ConfirmadaPageModule)
              }
            ]
          }
        ]
      },
    ]
  },
  {
    path: 'agregar',
    loadChildren: () => import('./agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: ':Filtro',
    loadChildren: () => import('./lista/lista.module').then( m => m.ListaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
