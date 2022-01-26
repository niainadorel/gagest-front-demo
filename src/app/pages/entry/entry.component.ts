import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestService, CartService, ProductsService } from '../../@core/services';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  loading = true;
  rows = [];
  sorts = [
    {prop: 'totalPrice', dir: 'desc'},
    {prop: 'title', dir: 'desc'},
    {prop: 'addDate', dir: 'desc'},
    {prop: 'title', dir: 'desc'}
  ];
  entry: any;
  selectedProduct: any;
  quantity = 0;
  inAdd = false;
  temp = [];
  @ViewChild('entryTable', {static: false}) entryTable: any;
  constructor(
    private rqs: RequestService,
    private pds: ProductsService,
    private dialogService: NbDialogService
  ) {
    this.loadEntry();
  }

  ngOnInit() {
  }

  // charge les entry depuis la base de données
  loadEntry() {
    this.rqs.getEntry().then(res => {
      if (res && res.success) {
        this.entry = res.data[0].entry;
        this.rows = [...res.data[0].entry].map((el, index) => {
          const item = {...el.product};
          delete el.product;
          el.index = index;
          Object.assign(item, el);
          item.totalPrice = item.bought_price * item.quantity;
          return item;
        });
        this.loading = false;
        this.temp = [...this.rows];
      }
    });
  }

  deleteEntry(achat) {
    this.loading = true;
    this.rqs.deleteEntry(achat._id).then(response => {
      console.log(response);
      this.rows.splice(achat.index, 1);
      this.rows = this.rows.map((r, index) => {
        r.index = index;
        return r;
      });
      this.rows = [...this.rows];
      this.loading = false;
    });
  }

  openEntryDialog() {
    this.dialogService.open(NewEntryComponent, {
      context: {
        data: {
          callback: (product) => {
            console.log(product);
            this.selectedProduct = {...product};
          }
        }
      }
    });
  }

  addEntry() {
    this.loading = true;
    const entre = {
      img: this.selectedProduct.img,
      bought_price: this.selectedProduct.bought_price,
      quantity: this.quantity,
      title: this.selectedProduct.title
    };
    this.rqs.updateProduct({
      _id: this.selectedProduct._id,
      quantity: this.selectedProduct.quantity + this.quantity
    }).then(temp => {
      this.rqs.addEntry(entre).then(res => {
        if (res && res.success) {
          this.quantity = 0;
          this.selectedProduct = null;
          this.inAdd = false;
          this.loadEntry();
          this.pds.load();
        }
      });
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log('Val', val, this.temp);
    const temp = this.temp.filter( (d) => {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val
      || (d.totalPrice + '').toLowerCase().indexOf(val) !== -1;
    });

    this.rows = temp;
    this.entryTable.offset = 0;
  }
}
