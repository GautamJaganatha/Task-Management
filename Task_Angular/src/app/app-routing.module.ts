import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/componenets/login/login.component';
import { SignupComponent } from './auth/componenets/signup/signup.component';


const routes: Routes = [
  {path:"login", component:LoginComponent },
  {path: "signup", component:SignupComponent},
  {path: "admin", loadChildren: ()=> import("./modules/admin/admin-routing.module").then(e=>e.AdminRoutingModule)},
  {path: "employee", loadChildren: ()=> import("./modules/employee/employee-routing.module").then(e=>e.EmployeeRoutingModule)}

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
