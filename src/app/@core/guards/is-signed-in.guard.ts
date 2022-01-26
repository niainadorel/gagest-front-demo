import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SessionService, DataService } from '../services';
@Injectable({
  providedIn: 'root'
})
export class IsSignedInGuard implements CanActivate {
  constructor(private session: SessionService, private router: Router, private dts: DataService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const session = this.session.getSession();
    const canGo = this.dts.canGo(next.url[0].path);
    console.log('cannnnnn ====', next , state);
    if (!session) {
      this.router.navigate(['/auth/login']);
    }
    if (session && !canGo) {
      this.router.navigate(['/pages/products']);
    }
    return canGo && session;
  }

}
