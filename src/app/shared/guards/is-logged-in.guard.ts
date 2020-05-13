import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = new Observable<boolean>(observer => {
      this.authService.isAuthenticated().subscribe(
        (res: boolean) => {
          if (res) {
            observer.next(true);
            observer.complete();
          } else {
            this.router.navigate(['/login']);
            observer.next(false);
            observer.complete();
          }
        },
        error => {
          this.router.navigate(['/login']);
          observer.next(false);
          observer.complete();
        }
      );
    });

    return isLoggedIn;
  }
}
