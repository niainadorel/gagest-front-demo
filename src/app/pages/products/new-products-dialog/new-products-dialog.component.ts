import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { RequestService, DataService } from '../../../@core/services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-products-dialog',
  changeDetection : ChangeDetectionStrategy.OnPush,
  templateUrl: './new-products-dialog.component.html',
  styleUrls: ['./new-products-dialog.component.scss']
})
export class NewProductsDialogComponent implements OnInit {

  imgSrc: any = '';
  data: any;
  productsForm: FormGroup;
  loading = false;
  myCategories: string[];
  imageSelected: any = false;
  newCategorie = false;
  keyword = 'name';

  constructor(
    public dialog: NbDialogRef<NewProductsDialogComponent>,
    private formB: FormBuilder,
    private dts: DataService,
    private rqs: RequestService,
    private router: Router,
    private ref: ChangeDetectorRef

  ) {
    this.rqs.getCategories().then(res => {
      this.myCategories = res.data.categories;
    });
  }

  ngOnInit() {
    console.log(this.data);
    if (!this.data.edit) {
      this.productsForm = this.formB.group({
        title: [null, Validators.required],
        description: [null, Validators.required],
        bought_price: [null, Validators.required],
        sell_price: [null, Validators.required],
        // big_quantity_price: [null, Validators.required],
        // minimum_sell_price: [null, Validators.required],
        quantity: [null, Validators.required],
        unit: [null, Validators.required],
        category: [null, Validators.required],
        stockDAlert: [null],
        stockMinimum: [null],
        stockMaximum: [null],
        fournisseur: [null],
        reference: [null]
      });
    } else {
      this.imgSrc = this.data.item.img;
      this.imageSelected = true;
      this.productsForm = this.formB.group({
        title: [this.data.item.title, Validators.required],
        description: [this.data.item.description, Validators.required],
        bought_price: [this.data.item.bought_price, Validators.required],
        sell_price: [this.data.item.sell_price, Validators.required],
        // big_quantity_price: [this.data.item.big_quantity_price, Validators.required],
        // minimum_sell_price: [this.data.item.minimum_sell_price, Validators.required],
        quantity: [this.data.item.quantity, Validators.required],
        unit: [this.data.item.unit, Validators.required],
        category: [this.data.item.category],
        stockDAlert: [this.data.item.stockDAlert],
        stockMinimum: [this.data.item.stockMinimum],
        stockMaximum: [this.data.item.stockMaximum],
        barcode: [this.data.item.barcode, Validators.required],
        fournisseur: [this.data.item.fournisseur],
        reference: [this.data.item.reference]
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
      console.log(this.productsForm.value);
      this.loading = true;
      const product = this.productsForm.value;
      product.img = this.imgSrc;
      product.newCategorie = this.newCategorie;
      if (this.productsForm.value.fournisseur && this.productsForm.value.fournisseur.name) {
        product.fournisseur = this.productsForm.value.fournisseur.name;
      }
      console.log(product.fournisseur);
      setTimeout(() =>  {
        this.loading = false;
        this.data.callback(product);
        this.dialog.close();
      });
    } else {
      console.log(this.productsForm.value);
      const product = this.productsForm.value;
      product.img = this.imgSrc;
      console.log(product.img);
      this.loading = true;
      if (this.productsForm.value.fournisseur && this.productsForm.value.fournisseur.name) {
        product.fournisseur = this.productsForm.value.fournisseur.name;
      }
      console.log(product.fournisseur);
      setTimeout(() =>  {
        this.loading = false;
        this.data.callback(product);
        this.dialog.close();
      }, 1000);
    }

  }
  goToCategories() {
    this.dialog.close();
    this.router.navigate(['/pages/products/categories']);
  }
  close() {
    console.log('closing');
    this.dialog.close();
  }

  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }


}
