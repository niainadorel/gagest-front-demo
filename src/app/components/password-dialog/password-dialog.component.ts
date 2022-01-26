import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { RequestService } from '../../@core/services';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
@Component({
  selector: 'app-password-dialog',
  changeDetection : ChangeDetectionStrategy.OnPush,
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {

  data: any;
  passwordsForm: FormGroup;
  loading = false;
  imageSelected: any = false;
  @ViewChild('successSwal', {static: true}) private successSwal: SwalComponent;
  @ViewChild('errorSwal', {static: true}) private errorSwal: SwalComponent;

  constructor(
    public dialog: NbDialogRef<PasswordDialogComponent>,
    private formB: FormBuilder,
    private rqs: RequestService
  ) {
  }

  ngOnInit() {
    this.passwordsForm = this.formB.group({
      lastPassword: [null, Validators.required],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }
  save() {
    this.loading = true;
    const loginData = this.passwordsForm.value;
    loginData.email = this.data.userEmail;

    this.rqs.changePassword(loginData).then(res => {
      console.log(res);
      if (res && res.success) {
        localStorage.removeItem('_istockuser');
        this.successSwal.fire();
      } else if (res && !res.success && res.data === 'ERROR_PASSWORD') {
        this.errorSwal.fire();
      }
      this.loading = false;
    });
  }
  close() {
    console.log('closing');
    this.dialog.close();
  }

}
