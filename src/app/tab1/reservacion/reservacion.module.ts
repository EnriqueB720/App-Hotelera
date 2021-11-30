import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservacionPageRoutingModule } from './reservacion-routing.module';

import { ReservacionPage } from './reservacion.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ReservacionPageRoutingModule
  ],
  declarations: [ReservacionPage]
})
export class ReservacionPageModule {}
