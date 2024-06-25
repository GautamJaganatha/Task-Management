import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './componenets/dashboard/dashboard.component';
import { PostTaskComponent } from './componenets/post-task/post-task.component';

const routes: Routes = [
  {path:"dashboard", component:DashboardComponent},
  {path:"post-task", component:PostTaskComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingRoutingModule { }
