import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestService, CartService, ProductsService } from '../../@core/services';
import { ChooseproductComponent } from './chooseproduct/chooseproduct.component';
import { NbDialogService } from '@nebular/theme';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-colis',
  templateUrl: './colis.component.html',
  styleUrls: ['./colis.component.scss']
})
export class ColisComponent implements OnInit {
  loading = true;
  rows = [];
  sorts = [
    {prop: 'totalPrice', dir: 'desc'},
    {prop: 'title', dir: 'desc'},
    {prop: 'addDate', dir: 'desc'},
    {prop: 'title', dir: 'desc'},
    {prop: 'supposedArrivalDate', dir: 'desc'},
    {prop: 'done', dir: 'desc'}
  ];
  colis: any;
  selectedProduct: any;
  quantity = 0;
  inAdd = false;
  temp = [];
  sens = 'entry';
  localisation: string;
  supposedArrivalDate: Date;
  inEdit: any;
  @ViewChild('colisTable', {static: false}) colisTable: any;
  @ViewChild('editSwal', {static: false}) editSwal: SwalComponent;
  @ViewChild('confirmSwal', {static: false}) confirmSwal: SwalComponent;
  constructor(
    private rqs: RequestService,
    private pds: ProductsService,
    private dialogService: NbDialogService
  ) {
    this.loadColis();
  }

  ngOnInit() {
  }

  // charge les colis depuis la base de données
  loadColis() {
    this.rqs.getColis().then(res => {
      if (res && res.success) {
        this.colis = res.data;
        this.rows = [...res.data].map((el, index) => {
          el.index = index;
          return el;
        });
        this.loading = false;
        this.temp = [...this.rows];
      }
    });
  }

  openColisDialog() {
    this.dialogService.open(ChooseproductComponent, {
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

  async edit(colis) {
    const { value: localisation } = await this.editSwal.fire();
    if (localisation) {
      this.loading = true;
      this.rows[colis.index].localisation = localisation;
      this.rows = [...this.rows];
      const setting = {
        _id: colis._id,
        localisation
      };
      this.rqs.updateColis(setting).then(res => {
        this.loading = false;
      });
    }
  }
  async openConfirm(colis) {
    const { value: confirm } = await this.confirmSwal.fire();
    console.log(confirm);
    if (confirm) {
      this.loading = true;
      const entre = {
        img: colis.img,
        bought_price: colis.bought_price,
        quantity: colis.quantity,
        title: colis.title
      };
      console.log(colis.quantity);
      this.rqs.updateProduct({
        _id: colis.product,
        $inc: {quantity: colis.quantity}
      }).then(temp => {
        this.rqs.addEntry(entre).then(res => {
          if (res && res.success) {
            this.rqs.updateColis({
              _id: colis._id,
              done: true
            }).then(res2 => {
              this.rows[colis.index].done = true;
              this.rows = [...this.rows];
              this.loading = false;
              this.pds.load();
            });
          }
        });
      });
    }
  }

  update(value) {
    console.log(value);
  }

  addColis() {
    this.loading = true;
    const colis = {
      img: this.selectedProduct.img,
      bought_price: this.selectedProduct.bought_price,
      quantity: this.quantity,
      title: this.selectedProduct.title,
      sens: this.sens,
      localisation: this.localisation,
      supposedArrivalDate: this.supposedArrivalDate,
      product: this.selectedProduct._id
    };
    this.rqs.saveColis(colis).then(res => {
      if (res && res.success) {
        this.quantity = 0;
        this.sens = 'entrant';
        this.supposedArrivalDate = null;
        this.localisation = '';

        this.selectedProduct = null;
        this.inAdd = false;
        this.loadColis();
        this.pds.load();
      }
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter( (d) => {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val
      || (d.totalPrice + '').toLowerCase().indexOf(val) !== -1;
    });

    this.rows = temp;
    this.colisTable.offset = 0;
  }
}
