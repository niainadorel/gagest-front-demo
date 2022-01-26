import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService, DataService } from '../../../@core/services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private rqs: RequestService,
    private dts: DataService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: [null, Validators.required],
      address: [null, Validators.required],
      NIF: [null],
      STAT: [null],
      RCS: [null],
      phoneNumber: [null, Validators.compose([Validators.pattern(/[0-9\+]/g)])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: [null, Validators.required],
      website: [null]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });
  }

  ngOnInit() {
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
  }

  submitForms() {
    this.loading = true;
    const userdata = {
      name: this.registerForm.value.name,
      phoneNumber: this.registerForm.value.phoneNumber,
      address: this.registerForm.value.address,
      email: this.registerForm.value.email,
      website: this.registerForm.value.website,
      NIF: this.registerForm.value.NIF,
      STAT: this.registerForm.value.STAT,
      RCS: this.registerForm.value.RCS
    };
    const logindata = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };
    // tslint:disable-next-line:object-literal-shorthand
    this.rqs.save('users', {userdata: userdata, logindata: logindata}).then((res: any) => {
      console.log(res);
      if (res && res.success) {
        // console.log('here');
        // this.dts.user.next(res.user);
        // localStorage.setItem('_boba_i', res.data.user._id);
        // localStorage.setItem('_boba_token', res.data.token);
        // this.rqs.setHeaderToken(res.data.token);
        // this.dts.saveSocket();
        this.router.navigate(['/auth/login']);
      } else {
        this.loading = false;
        alert('Erreur');
      }
      // this.loading = false;
    }).catch(err => {
      this.loading = false;
    });
  }

}
