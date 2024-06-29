import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './componenets/dashboard/dashboard.component';
import { PostTaskComponent } from './componenets/post-task/post-task.component';
import { UpdateTaskComponent } from './componenets/update-task/update-task.component';
import { takeLast } from 'rxjs';
import { ViewTaskDetailsComponent } from './componenets/view-task-details/view-task-details.component';

const routes: Routes = [
  {path:"dashboard", component:DashboardComponent},
  {path:"post-task", component:PostTaskComponent},
  {path:"task/:id/edit", component:UpdateTaskComponent},
  {path:"task-details/:id", component:ViewTaskDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingRoutingModule { }
