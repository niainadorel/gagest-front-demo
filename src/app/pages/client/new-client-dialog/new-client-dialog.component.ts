import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-client-dialog',
  changeDetection : ChangeDetectionStrategy.OnPush,
  templateUrl: './new-client-dialog.component.html',
  styleUrls: ['./new-client-dialog.component.scss']
})
export class NewClientDialogComponent implements OnInit {

  imgSrc: any = '';
  data: any;
  clientsForm: FormGroup;
  loading = false;
  imageSelected: any = false;
  constructor(
    public dialog: NbDialogRef<NewClientDialogComponent>,
    private formB: FormBuilder,
    private router: Router,
    private ref: ChangeDetectorRef

  ) {
  }

  ngOnInit() {
    console.log(this.data.item);
    if (!this.data.edit) {
      console.log('heree');
      this.clientsForm = this.formB.group({
        name: [null, Validators.required],
        address: [null, Validators.required],
        NIF: [null, Validators.required],
        STAT: [null, Validators.required],
        RCS: [null, Validators.required],
        responsable: [null, Validators.required],
        phoneNumber: [null, Validators.required],
        email: [null, Validators.compose([Validators.required, Validators.email])],
        website: [null],
        username: [null, Validators.required],
        password: [null, Validators.required]
      });
    } else {
      this.imgSrc = this.data.item.img;
      this.imageSelected = true;
      this.clientsForm = this.formB.group({
        name: [this.data.item.name, Validators.required],
        address: [this.data.item.address, Validators.required],
        NIF: [this.data.item.NIF, Validators.required],
        STAT: [this.data.item.STAT, Validators.required],
        RCS: [this.data.item.RCS, Validators.required],
        responsable: [this.data.item.responsable, Validators.required],
        phoneNumber: [this.data.item.phoneNumber, Validators.required],
        email: [this.data.item.email, Validators.compose([Validators.required, Validators.email])],
        website: [this.data.item.website],
        username: [this.data.item.username, Validators.required],
        password: [this.data.item.password, Validators.required]
      });
    }

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
    if (!this.data.edit) {
      console.log(this.clientsForm.value);
      this.loading = true;
      const client = this.clientsForm.value;
      client.img = this.imgSrc;
      setTimeout(() =>  {
        this.loading = false;
        this.data.callback(client);
        this.dialog.close();
      });
    } else {
      console.log(this.clientsForm.value);
      const client = this.clientsForm.value;
      client.img = this.imgSrc;
      this.loading = true;
      setTimeout(() =>  {
        this.loading = false;
        this.data.callback(client);
        this.dialog.close();
      }, 1000);
    }

  }
  close() {
    console.log('closing');
    this.dialog.close();
  }

}
