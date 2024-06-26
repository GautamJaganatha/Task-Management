import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingRoutingModule } from './admin-routing-routing.module';
import { DemoAngularMaterial } from 'src/app/DemoAngularMaterial';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingRoutingModule,
    DemoAngularMaterial,
  ]
})
export class AdminRoutingModule { }
