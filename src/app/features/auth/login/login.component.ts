import { Component } from '@angular/core';
import {LoginRequest} from '../models/login-request.model';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  model: LoginRequest;

  constructor(
    private authService: AuthService
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
        console.log(res)
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }
}
