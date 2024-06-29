import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

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


  constructor(private adminService: AdminService,
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
      this.adminService.getTaskById(this.taskId).subscribe(
        (res) =>{
          this.taskData= res;
          console.log(res);
        }
      )
    }

    publishComment(){
      this.adminService.createComment(this.taskId, this.commentForm.get("content").value).subscribe(
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
      this.adminService.getCommentsByTaskId(this.taskId).subscribe(
        (res) =>{
          this.comments = res;
        }
      )
    }

}
