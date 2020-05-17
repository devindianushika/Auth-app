import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private authservice: AuthService,
    private ngFlashMessageService: NgFlashMessageService) { }

  ngOnInit() {
  }


  logoutUser() {
this.authservice.logout();

this.ngFlashMessageService.showFlashMessage({
  // Array of messages each will be displayed in new line
  messages: ['You are Logged out'],
  // Whether the flash can be dismissed by the user defaults to false
  dismissible: true,
  // Time after which the flash disappears defaults to 2000ms
  timeout: 2000,
  // Type of flash message, it defaults to info and success, warning, danger types can also be used
  type: 'success'
});
this.router.navigate(['/login']);
return false;
  }

}
