import { Component, OnInit } from '@angular/core';
import { CartService, RequestService } from '../../../@core/services';
@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss']
})
export class CartSidebarComponent implements OnInit {
  isSidebarShown = false;
  items: any;
  cartTotalPrice = 0;
  loading = false;
  constructor(
    private cts: CartService,
    private rqs: RequestService
  ) {
    this.cts.isSidebarShown.subscribe(d => {
      console.log(d);
      this.isSidebarShown = d;
    });
    this.cts.items.subscribe(value => {
      let cartTotalPriceTemp = 0;
      this.items = [...value].reverse();
      for (const item of value) {
        cartTotalPriceTemp += item.quantity * item.product.bought_price;
      }
      this.cartTotalPrice = cartTotalPriceTemp;
    });
  }

  ngOnInit() {
  }

  toogleCartSidebar() {
    this.cts.toggleSidebar();
  }

  incrementQty(id: string) {
    this.cts.incrementQty(id);
  }

  decrementQty(id: string) {
    this.cts.decrementQty(id);
  }

  deleteFromCart(id) {
    this.cts.deleteItem(id);
  }

  validCart() {
    this.loading = true;
    const achats = [...this.items].map(item => {
      item.product = item.product._id;
      item.status = 'validate';
      item.validationDate = new Date();
      item.doneDate = null;
      return item;
    });
    this.rqs.addEntry(achats).then(res => {
      this.cts.objectItems = {};
      this.cts.validationObservable.next(null);
      this.cts.items.next([]);
      this.loading = false;
      console.log(res);
    });
  }

}
