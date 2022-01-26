import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-modif-dialog',
  changeDetection : ChangeDetectionStrategy.OnPush,
  templateUrl: './modif-dialog.component.html',
  styleUrls: ['./modif-dialog.component.scss']
})
export class ModifDialogComponent implements OnInit {

  imgSrc: any = '';
  data: any;
  productsForm: FormGroup;
  loading = false;
  constructor(
    public dialog: NbDialogRef<ModifDialogComponent>,
    private formB: FormBuilder,
  ) {
  }

  ngOnInit() {
    console.log(this.data);
    this.productsForm = this.formB.group({
      quantity: [this.data.item.quantity, Validators.required],
      changementCause: [null, Validators.required],
      modifier: [null, Validators.required],
    });

  }
  save() {
    console.log(this.productsForm.value);
    const productQuantity = this.productsForm.value.quantity;
    this.loading = true;
    setTimeout(() =>  {
      this.loading = false;
      this.data.callback(productQuantity, this.productsForm.value.changementCause
        , this.productsForm.value.modifier);
      this.dialog.close();
    }, 1000);

  }
  close() {
    console.log('closing');
    this.dialog.close();
  }

}
