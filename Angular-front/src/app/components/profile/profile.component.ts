import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(
    private authservice: AuthService
  ) {  }

  ngOnInit() {

    this.authservice.getProfile().subscribe((res: any) => {
      this.user = res.user;
      console.log(this.user);
    } );
  }

}
