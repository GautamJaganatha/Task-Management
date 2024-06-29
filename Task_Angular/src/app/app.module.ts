import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/componenets/login/login.component';
import { SignupComponent } from './auth/componenets/signup/signup.component';
import { DemoAngularMaterial } from './DemoAngularMaterial';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostTaskComponent } from './modules/admin/componenets/post-task/post-task.component';
import { DashboardComponent } from './modules/admin/componenets/dashboard/dashboard.component';
import { UpdateTaskComponent } from './modules/admin/componenets/update-task/update-task.component';
import {DashboardComponent as EmployeeDashboardComponent} from './modules/employee/components/dashboard/dashboard.component';
import { ViewTaskDetailsComponent } from './modules/admin/componenets/view-task-details/view-task-details.component';
import { ViewTaskDetailsComponent as EmployeeViewTaskDetailsComponent} from './modules/employee/components/view-task-details/view-task-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PostTaskComponent,
    DashboardComponent,
    UpdateTaskComponent,
    EmployeeDashboardComponent,
    ViewTaskDetailsComponent,
    EmployeeViewTaskDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoAngularMaterial,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
