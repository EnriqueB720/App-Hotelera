import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmadaPageRoutingModule } from './confirmada-routing.module';

import { ConfirmadaPage } from './confirmada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmadaPageRoutingModule
  ],
  declarations: [ConfirmadaPage]
})
export class ConfirmadaPageModule {}
