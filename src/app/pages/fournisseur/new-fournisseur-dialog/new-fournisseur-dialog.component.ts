import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-fournisseur-dialog',
  changeDetection : ChangeDetectionStrategy.OnPush,
  templateUrl: './new-fournisseur-dialog.component.html',
  styleUrls: ['./new-fournisseur-dialog.component.scss']
})
export class NewFournisseurDialogComponent implements OnInit {

  imgSrc: any = '';
  data: any;
  fournisseursForm: FormGroup;
  loading = false;
  imageSelected: any = false;
  constructor(
    public dialog: NbDialogRef<NewFournisseurDialogComponent>,
    private formB: FormBuilder,
    private router: Router,
    private ref: ChangeDetectorRef

  ) {
  }

  ngOnInit() {
    console.log(this.data.item);
    if (!this.data.edit) {
      console.log('heree');
      this.fournisseursForm = this.formB.group({
        name: [null, Validators.required],
      });
    } else {
      this.imgSrc = this.data.item.img;
      this.imageSelected = true;
      this.fournisseursForm = this.formB.group({
        name: [this.data.item.name, Validators.required],
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
      console.log(this.fournisseursForm.value);
      this.loading = true;
      const fournisseur = this.fournisseursForm.value;
      fournisseur.img = this.imgSrc;
      setTimeout(() =>  {
        this.loading = false;
        this.data.callback(fournisseur);
        this.dialog.close();
      });
    } else {
      console.log(this.fournisseursForm.value);
      const fournisseur = this.fournisseursForm.value;
      fournisseur.img = this.imgSrc;
      this.loading = true;
      setTimeout(() =>  {
        this.loading = false;
        this.data.callback(fournisseur);
        this.dialog.close();
      }, 1000);
    }

  }
  close() {
    console.log('closing');
    this.dialog.close();
  }

}
