import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarcontraPageRoutingModule } from './actualizarcontra-routing.module';

import { ActualizarcontraPage } from './actualizarcontra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarcontraPageRoutingModule
  ],
  declarations: [ActualizarcontraPage]
})
export class ActualizarcontraPageModule {}
