import { Injectable } from '@angular/core';
import { Router,CanActivate, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      let user = localStorage.getItem("user");
      if(user) {
        this.router.navigate(["/admin"]);
        return true;
      }else {
        this.router.navigate(["/login"]);
        return false
      }
  }
}
