import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiscitasPageRoutingModule } from './miscitas-routing.module';

import { MiscitasPage } from './miscitas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiscitasPageRoutingModule
  ],
  declarations: [MiscitasPage]
})
export class MiscitasPageModule {}
