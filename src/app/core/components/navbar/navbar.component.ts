import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authService.user()
      .subscribe({
      next: res=>{
        console.log(res)
      }
    })
  }
}
