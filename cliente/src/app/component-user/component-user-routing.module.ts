import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentUserPage } from './component-user.page';

const routes: Routes = [
  {
    path: '',
    component: ComponentUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentUserPageRoutingModule {}
