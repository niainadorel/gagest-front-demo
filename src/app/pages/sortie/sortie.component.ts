import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestService, CartService, DataService, ProductsService } from '../../@core/services';
import { NbDialogService } from '@nebular/theme';
import { NewSortieComponent } from './new-sortie/new-sortie.component';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-sortie',
  templateUrl: './sortie.component.html',
  styleUrls: ['./sortie.component.scss', '../entry/entry.component.scss']
})
export class SortieComponent implements OnInit {

  loading = true;
  rows = [];
  sorts = [
    {prop: 'addDate', dir: 'desc'},
    {prop: 'dateEcheance', dir: 'desc'},
    {prop: 'clientName', dir: 'desc'},
    {prop: 'totalPrice', dir: 'desc'},
  ];
  entry: any;
  selectedProducts = [];
  quantity = 0;
  inAdd = false;
  objectItems = {};
  items: any[] = [];
  cartTotalPrice = 0;
  cartTotalPriceWithTax = 0;
  modeDePaiement = '';
  dateEcheance: any;
  clientName = '';
  clientAddress = '';
  payed = 0;
  user: any;
  toPrint: any;
  sortieForm: FormGroup;
  exportAsConfig: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'facture',
    options: { // html-docx-js document options
      margins: {
        top: '0',
        bottom: '0'
      },
      quality: 'hight'
    }
  };

  keyword = 'name';
  suggestionData: any;
  temp = [];

  @ViewChild('entryTable', {static: false}) sortieTable: any;
  constructor(
    private rqs: RequestService,
    private dts: DataService,
    private dialogService: NbDialogService,
    private exportAsService: ExportAsService,
    private formB: FormBuilder,
    private pds: ProductsService

  ) {
    this.dts.user.subscribe(u => this.user = u);
    this.loadSortie();
    this.sortieForm = this.formB.group(
      {
        client: [null],
        tva: [0, Validators.required]
      }
    );
    this.rqs.getClients().then(res => {
      console.log(res);
      this.suggestionData = res.data;
    });
    // this.loading = false;
  }

  ngOnInit() {
  }

  // charge les entry depuis la base de données
  loadSortie() {
    this.rqs.getSortie().then(res => {
      if (res && res.success) {
        this.entry = res.data[0].sorties;
        console.log(this.entry);
        this.rows = [...res.data[0].sorties].map((el, index) => {
          const item = {...el.product};
          delete el.product;
          el.index = index;
          Object.assign(item, el);
          return item;
        });
        this.temp = [...this.rows];
        this.loading = false;
      }
    });
  }

  openSortieDialog() {
    this.dialogService.open(NewSortieComponent, {
      context: {
        data: {
          callback: (product) => {
            console.log(product);
            this.addToCart(product);
          }
        }
      }
    });
  }

  addSortie() {
    this.loading = true;
  }

  ajustTotalPrice() {
    let cartTotalPriceTemp = 0;
    let tax = 0;
    for (const item of this.items) {
      cartTotalPriceTemp += item.quantity * (item.product.sell_price - (item.product.sell_price * ((item.remise || 0) / 100)));
    }
    // remise = this.sortieForm.value.remise ? ((cartTotalPriceTemp * this.sortieForm.value.remise) / 100) : 0;
    this.cartTotalPrice = cartTotalPriceTemp;
    tax = this.sortieForm.value.tva ? ((this.cartTotalPrice * this.sortieForm.value.tva) / 100) : 0;
    this.cartTotalPriceWithTax = this.cartTotalPrice + tax;
  }

  addToCart(product: any) {
    const items = this.items;
    if (this.objectItems[product._id] !== undefined) {
      console.log(items[this.objectItems[product._id]]);
      if (items[this.objectItems[product._id]].quantity < product.quantity) {
        items[this.objectItems[product._id]].quantity++;
      }
    } else {
      this.objectItems[product._id] = items.length;
      items.push({product, quantity: 1,  remise: 0});
    }
    this.items = items;
    this.ajustTotalPrice();
  }

  incrementQty(productId: string, maxValue) {
    const items = this.items;
    if (items[this.objectItems[productId]].quantity < maxValue) {
      items[this.objectItems[productId]].quantity++;
      this.items = items;
      this.ajustTotalPrice();
    }
  }

  decrementQty(productId: string, maxValue) {
    const items = this.items;
    items[this.objectItems[productId]].quantity--;
    this.items = items;
    this.ajustTotalPrice();
  }
  updateValue(target, productId, maxValue) {
    const items = this.items;
    const value = parseInt(target.value, 10);
    target.value = Math.min(value, maxValue);
    items[this.objectItems[productId]].quantity = Math.min(value, maxValue);
    this.items = items;
    this.ajustTotalPrice();
  }

  deleteItem(id) {
    const items = this.items;
    items.splice(this.objectItems[id], 1);
    delete this.objectItems[id];
    this.items = items;
    this.ajustTotalPrice();
  }

  saveSortie() {
    console.log(this.sortieForm.value);
    // this.loading = true;
    const client = (this.sortieForm.value && this.sortieForm.value?.client.name)
      ? {...this.sortieForm.value.client}
      : {name: this.sortieForm.value.client};
    if (client && client.user) {
      delete client.user;
      delete client.status;
      delete client.img;
      delete client.connected;
      delete client.username;
      delete client.password;
    }


    this.loading = true;
    console.log(client);
    const sortie = {
      products: this.items,
      client,
      totalPrice: this.cartTotalPrice,
      tva: this.sortieForm.value.tva || 0
    };

    this.rqs.decreaseProducts(this.items).then(d => {
      this.rqs.addSortie(sortie).then(res => {
        console.log(res);
        this.inAdd = false;
        this.items = [];
        this.sortieForm.reset();
        this.cartTotalPrice = 0;
        this.cartTotalPriceWithTax = 0;
        this.loadSortie();
        this.pds.load();
        this.loading = false;
      });
    });

  }
  getPdf(item) {
    this.loading = true;
    console.log(item);
    this.toPrint = item;
    setTimeout(() => {
      this.exportAsService.save(this.exportAsConfig, `Facture-${this.user.name}-${item.client.name || ''}-no-${item._id}`).subscribe(() => {
        this.loading = false;
      });
    }, 1500);

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

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter( (d) => {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val
      || (d.totalPrice + '').toLowerCase().indexOf(val) !== -1;
    });

    this.rows = temp;
    this.sortieTable.offset = 0;
  }
}
