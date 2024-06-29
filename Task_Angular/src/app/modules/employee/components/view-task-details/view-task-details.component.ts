import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-task-details',
  templateUrl: './view-task-details.component.html',
  styleUrls: ['./view-task-details.component.scss']
})
export class ViewTaskDetailsComponent {




  taskId : number = this.activatedRoute.snapshot.params["id"];
  taskData : any;

  comments : any;

  commentForm! : FormGroup;


  constructor(private employeeService: EmployeeService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute){}

    ngOnInit(){
      this.getTaskById();

      this.commentForm = this.fb.group({
        content : [null,[Validators.required]]
      })

    }

    getTaskById(){
      this.employeeService.getTaskById(this.taskId).subscribe(
        (res) =>{
          this.taskData= res;
          console.log(res);
        }
      )
    }

    publishComment(){
      this.employeeService.createComment(this.taskId, this.commentForm.get("content").value).subscribe(
        (res) =>{
          if(res.id !=null){
            this.snackbar.open("Comment posted successfully", "Close",{duration: 5000});
            this.getComments();
          }
          else{
            this.snackbar.open("Somenthing went wrong","Close",{duration: 5000});
          }
        }
      )
    }

    getComments(){
      this.employeeService.getCommentsByTaskId(this.taskId).subscribe(
        (res) =>{
          this.comments = res;
        }
      )
    }

}
