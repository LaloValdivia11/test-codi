import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentUserPageRoutingModule } from './component-user-routing.module';

import { ComponentUserPage } from './component-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentUserPageRoutingModule
  ],
  declarations: [ComponentUserPage]
})
export class ComponentUserPageModule {}
