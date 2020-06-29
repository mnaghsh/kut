import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService,
    private myRoute: Router) {
}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.authenticationService.loginStatus()) {
        this.myRoute.navigate(['login']);
        return false;
      }
    return true;
  }
}
