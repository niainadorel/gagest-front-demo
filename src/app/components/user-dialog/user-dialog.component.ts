import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-user-dialog',
  changeDetection : ChangeDetectionStrategy.OnPush,
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  imgSrc: any = '';
  data: any;
  userForm: FormGroup;
  loading = false;
  imageSelected: any = false;
  constructor(
    public dialog: NbDialogRef<UserDialogComponent>,
    private formB: FormBuilder,
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    console.log(this.data);
    this.imgSrc = this.data.item.picture;
    this.userForm = this.formB.group({
      name: [this.data.item.name, Validators.required],
      address: [this.data.item.address, Validators.required],
      NIF: [this.data.item.NIF],
      STAT: [this.data.item.STAT],
      RCS: [this.data.item.RCS],
      phoneNumber: [this.data.item.phoneNumber, Validators.required],
      email: [this.data.item.email, Validators.compose([Validators.required, Validators.email])],
      website: [this.data.item.website],
    });

  }

  fileChange(event) {
    console.log('file change');
    const reader: any = new FileReader();
    const file = event.target.files;
    if (file[0] && (file[0].type === 'image/png' || file[0].type === 'image/jpg' || file[0].type === 'image/jpeg')) {
      reader.onloadend = () => {
        this.setImgSrc(reader.result);
        this.ref.detectChanges();
      };
      reader.readAsDataURL(file[0]);

    }
  }
  setImgSrc(value) {
    this.imgSrc = value;
    this.imageSelected = true;
  }
  save() {
    this.loading = true;
    const userdata = this.userForm.value;
    userdata.picture = this.imgSrc;
    setTimeout(() =>  {
      this.loading = false;
      this.data.callback(userdata);
      this.dialog.close();
    });
  }
  close() {
    console.log('closing');
    this.dialog.close();
  }

}
