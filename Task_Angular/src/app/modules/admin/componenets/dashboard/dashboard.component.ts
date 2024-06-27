import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  searchForm! : FormGroup;



  listOfTasks : any = [];


  constructor(private adminService: AdminService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar){
      this.getAllTasks();
      this.searchForm = this.fb.group({
        title : [null]
      })
  }

  getAllTasks(){
    this.adminService.getAllTask().subscribe(
      (res) =>{
        console.log(res);
        this.listOfTasks = res;
      }
    )
  }

  deleteTask(id: number) {
    this.adminService.deleteTask(id).subscribe(
      (res) =>{
        this.snackbar.open("Task Deleted Successfull","Close", {duration:5000});
        this.getAllTasks();
      }
    )
    }

    searchTask(){
      this.listOfTasks = [];
      const tile: any = this.searchForm.get('title').value;
      console.log(tile);
      this.adminService.searchTask(tile).subscribe(
        (res) =>{
          console.log(res);
          this.listOfTasks = res;
        }
      )
    }
}
