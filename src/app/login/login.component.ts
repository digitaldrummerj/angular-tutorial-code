import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(formValues) {
    this.invalidLogin = false;
    this.authService.login(formValues.email, formValues.password)
      .subscribe(result => {
        if (!result) {
          console.log('login.component user not found');
          this.invalidLogin = true;
        } else {
          console.log('login.component logged in. redirecting to home page');
          this.invalidLogin = false;
          this.router.navigate(['/']);
        }
      });
  }
}
