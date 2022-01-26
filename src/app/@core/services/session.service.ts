import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { DataService } from './data.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  session: any = false;

  constructor(private rqs: RequestService, private dts: DataService, private router: Router) {}

  tryInit() {
    const localuserId = localStorage.getItem('_boba_i');
    if (localuserId) {
      this.rqs.setHeaderToken(localStorage.getItem('_boba_token'));
      this.rqs.getUserData(localuserId).then((res) => {
        console.log(res);
        if (res && res.success) {
          this.dts.menu.next([...res.data.activeLink]);
          delete res.data.activeLink;
          this.dts.user.next(res.data);
          this.dts.saveSocket();
          this.session = true;
        } else {
          this.router.navigate(['/auth/login']);
        }
      });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
  getSession() {
    if (this.session) {
      return true;
    } else {
      return !!localStorage.getItem('_boba_i');
    }
  }
  setSession(value) {
    this.session = value;
  }
  getUserData() {
    return this.dts.user.value;
  }
  setUserData(data) {
    this.dts.user.next(data);
  }
}
