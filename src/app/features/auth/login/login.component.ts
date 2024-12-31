import { Component } from '@angular/core';
import {LoginRequest} from '../models/login-request.model';
import {AuthService} from '../services/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  model: LoginRequest;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router : Router
  ) {
    this.model = {
      email: '',
      password: ''
    }
  }

  onFormSubmit(): void {
    console.log(this.model)
    this.authService.login(this.model).subscribe({
      next: (res)=>{
        // set Auth cookie
        this.cookieService.set('Authorization', `Bearer ${res.token}`,
          undefined, '/', undefined, true, 'Strict');
        // Redirect back to Home
        this.router.navigateByUrl('/')
        console.log(res)
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }
}
