import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../features/auth/services/auth.service';
import {User} from '../../../features/auth/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  user ?: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.authService.user()
      .subscribe({
      next: res=>{
        this.user = res
      }
    })

    this.user = this.authService.getUser()
  }

  onLogout() {
    this.authService.logout()
    this.router.navigateByUrl('/')
  }
}
