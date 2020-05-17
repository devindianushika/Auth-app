import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {JwtModule, JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  user: any; // define type of user object
  authtoken: any;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) { }





  registerUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/user/register', user,
      { headers }).pipe(map(response => response));

  }


  loginUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/user/login', user,
      { headers }).pipe(map(response => response));
  }

  storeData(token, userData) {   // store token in local storage
    localStorage.setItem('tokenId', token);
    localStorage.setItem('user', JSON.stringify(userData)); // canoot store objects in localstorage.therefore convert userData to string
    this.authtoken = token;
    this.user = userData;

  }


  getProfile() {

    this.fetchToken();
    const headers = new HttpHeaders();
    headers.append('Authorization', this.authtoken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/user/profile',
      { headers: headers }).pipe(map(response => response));
  }

  fetchToken() { // get the token which stored in localstorage
    const token = localStorage.getItem('tokenid');
    this.authtoken = token;
  }



  logout() { // remove user from localstorage
    this.user = null;
    this.authtoken = null;
    localStorage.clear();
  }



  loggedIn() {
    return !this.jwtHelper.isTokenExpired(this.authtoken);
  }
}
