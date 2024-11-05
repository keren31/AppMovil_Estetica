import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiscitasPageRoutingModule } from './miscitas-routing.module';

import { MiscitasPage } from './miscitas.page';
import { EditarCitaComponent } from '../editar-cita/editar-cita.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiscitasPageRoutingModule
  ],
  declarations: [MiscitasPage,EditarCitaComponent]
})
export class MiscitasPageModule {}
