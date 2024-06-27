import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { MatDatepickerPanel, MatDatepickerControl } from '@angular/material/datepicker';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent {


  Id : any = this.route.snapshot.params['id'];

  updateTaskForm! : FormGroup;
  listOfEmployee: any = [];
  listOfPrioorities: any = ["LOW","MEDIUM","HIGH"]
  listOftaskStatus: any = ["PENDING","INPROGRESS","COMPLETED","DEFERRED","CANCELED"]
 dueDatePicker: MatDatepickerPanel<MatDatepickerControl<any>,any,any>;


  constructor(
    private adminService : AdminService,
    private fb : FormBuilder,
    private snackbar : MatSnackBar,
    private router : Router,
    private route : ActivatedRoute,
  ){
    this.getTask();
    this.getUsers();
  }

  ngOnInit(){
    this.updateTaskForm= this.fb.group({
      employeeId : [null,[Validators.required]],
      title : [null,[Validators.required]],
      description : [null,[Validators.required]],
      dueDate : [null,[Validators.required]],
      priority: [null,[Validators.required]],
      taskStatus: [null,[Validators.required]]
    })
  }


  getTask(){
    this.adminService.getTaskById(this.Id).subscribe(
      (res)=>{
        this.updateTaskForm.patchValue(res);
        console.log(res);
      }
    )
  }

  getUsers(){
    this.adminService.getUsers().subscribe(
     (res) =>{
       this.listOfEmployee = res;
       console.log(res);
     }
   )
 }

 updateTask() {
  console.log(this.updateTaskForm.value);
  this.adminService.updateTask(this.Id,this.updateTaskForm.value).subscribe(
    (res) =>{
      if(res.id !=null){
        this.snackbar.open("Task updated Successfully", "Close",{
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
