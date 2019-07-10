import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../classes/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  loggedInUser: User;
  subscription: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loggedInUser = this.authService.getUser();

    this.authService.getLoggedInUser.subscribe((user: User) => {
      this.loggedInUser = user;
      console.log('user changed through emit', this.loggedInUser);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }
}
