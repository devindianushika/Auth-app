import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './service/auth.guard';
import {
  JwtModule, JWT_OPTIONS, JwtModuleOptions,
  JwtHelperService
} from '@auth0/angular-jwt';
import { HomeComponent } from './components/home/home.component';



// tslint:disable-next-line: variable-name
const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter,
    whitelistedDomains: []
  }
};



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgFlashMessagesModule,

    JwtModule.forRoot(JWT_Module_Options)

  ],


  providers: [AuthService, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function tokenGetter() {
  return localStorage.getItem('access_token');
}
