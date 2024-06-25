import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerControl, MatDatepickerPanel } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-post-task',
  templateUrl: './post-task.component.html',
  styleUrls: ['./post-task.component.scss']
})
export class PostTaskComponent {


  taskForm! : FormGroup;
  listOfEmployee: any = [];
  listOfPrioorities: any = ["LOW","MEDIUM","HIGH"]
dueDatePicker: MatDatepickerPanel<MatDatepickerControl<any>,any,any>;

  constructor(
    private adminService : AdminService,
    private fb : FormBuilder,
    private snackbar : MatSnackBar,
    private router : Router,
  ){
    this.getUsers();
  }

  ngOnInit(){
    this.taskForm = this.fb.group({
      employeeId : [null,[Validators.required]],
      title : [null,[Validators.required]],
      description : [null,[Validators.required]],
      dueDate : [null,[Validators.required]],
      priority: [null,[Validators.required]]
    })
  }

  getUsers(){
     this.adminService.getUsers().subscribe(
      (res) =>{
        this.listOfEmployee = res;
        console.log(res);
      }
    )
  }


  postTask() {
    console.log(this.taskForm.value);
    this.adminService.postTask(this.taskForm.value).subscribe(
      (res) =>{
        if(res.id !=null){
          this.snackbar.open("Task Posted Successfully", "Close",{
            duration:5000});
            this.router.navigateByUrl("/admin/dashboard")
        }
        else{
          this.snackbar.open("Something Went Wrong,", "Try Again",{duration: 5000});
        }
      },
    )
    }

}
