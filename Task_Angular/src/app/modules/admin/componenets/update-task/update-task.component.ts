import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent {


  Id : any = this.route.snapshot.params['id'];


  constructor(
    private adminService : AdminService,
    private fb : FormBuilder,
    private snackbar : MatSnackBar,
    private router : Router,
    private route : ActivatedRoute,
  ){
    this.getTask();
  }


  getTask(){
    this.adminService.getTaskById(this.Id).subscribe(
      (res)=>{
        console.log(res);
      }
    )
  }

}
