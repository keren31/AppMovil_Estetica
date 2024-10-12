import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarcontraPage } from './actualizarcontra.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarcontraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarcontraPageRoutingModule {}
