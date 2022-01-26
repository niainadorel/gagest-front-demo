import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService, RequestService, SessionService } from '../../../@core/services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../register/register.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  invalid = false;
  error: any;
  constructor(
    private fb: FormBuilder,
    private dts: DataService,
    private rqs: RequestService,
    private router: Router,
    private session: SessionService
  ) {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  submitForms() {
    this.loading = true;
    this.rqs.checkLogin(this.loginForm.value).then(res => {
      console.log(res);
      if (res && res.success) {
        this.dts.user.next(res.data.user);
        this.dts.menu.next([...res.data.user.activeLink]);
        localStorage.setItem('_boba_i', res.data.user._id);
        localStorage.setItem('_boba_token', res.data.token);
        this.rqs.setHeaderToken(res.data.token);
        this.dts.saveSocket();
        this.session.setSession(true);
        this.router.navigate(['/pages']);
      } else if (res && !res.success) {
        this.invalid = true;
        this.error = res.message;
        this.loading = false;
      }
    });
  }

}
