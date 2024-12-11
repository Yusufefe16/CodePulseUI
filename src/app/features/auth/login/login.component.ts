import { Component } from '@angular/core';
import {LoginRequest} from '../models/login-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  model: LoginRequest;

  constructor() {
    this.model = {
      email: '',
      password: ''
    }
  }

  onFormSubmit(): void {
    console.log(this.model)
  }
}
