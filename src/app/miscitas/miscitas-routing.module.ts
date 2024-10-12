import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiscitasPage } from './miscitas.page';

const routes: Routes = [
  {
    path: '',
    component: MiscitasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiscitasPageRoutingModule {}
