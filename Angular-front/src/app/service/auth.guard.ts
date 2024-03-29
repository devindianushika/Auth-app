import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

//   canActivate() {
//     if (this.auth.loggedIn() !== null) {
//       return true;
//     } else {
//       this.router.navigate(['unauthorized']);
//       return false;
//     }
//   }
// }



canActivate(): boolean {
  if (!this.auth.loggedIn()) {
      console.log ('bye');
      this.router.navigate(['/login']);
      return false;
  }
  console.log ('Welcome');
  return true;
}

}
