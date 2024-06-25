import { Component } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Task_Angular';

  isAdminLoggedIn : boolean = StorageService.isAdminLoggedIn();
  isEmployeeLoggedIn : boolean = StorageService.isEmployeeLoggedIn();

  constructor(
    private router : Router,
  ){

  }

  ngOnInit(){
    this.router.events.subscribe(event =>{
      this.isEmployeeLoggedIn = StorageService.isEmployeeLoggedIn();
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    })
  }

  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
