import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(formValues) {
    this.authService.login(formValues.email, formValues.password)
      .subscribe(result => {
        if (!this.authService.currentUser) {
          this.invalidLogin = true;
        } else {
          this.router.navigate(['/']);
        }
      });
  }
}
