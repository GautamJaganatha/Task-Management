import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingRoutingModule } from './employee-routing-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoAngularMaterial } from 'src/app/DemoAngularMaterial';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmployeeRoutingRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DemoAngularMaterial

  ]
})
export class EmployeeRoutingModule { }
