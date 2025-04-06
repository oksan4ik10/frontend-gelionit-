import { Injectable } from '@angular/core';
import { UrlTree, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated().then((result) => {
      if (!result) {
        console.log(result);

        return Promise.reject(this.router.navigate(['/home']));
      };
      console.log(result);

      return Promise.resolve(true);
    });
  }

}