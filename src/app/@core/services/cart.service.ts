import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: BehaviorSubject<any>;
  objectItems = {};
  isSidebarShown: BehaviorSubject<boolean>;
  validationObservable: BehaviorSubject<any>;
  constructor() {
    const localItems = localStorage.getItem('_is_tock_item');
    if (localItems) {
      this.items = new BehaviorSubject(JSON.parse(localItems));
      this.items.asObservable();
    } else {
      this.items = new BehaviorSubject([]);
      this.items.asObservable();
    }
    this.validationObservable = new BehaviorSubject(null);
    this.isSidebarShown = new BehaviorSubject(false);
    this.validationObservable.asObservable();
    this.isSidebarShown.asObservable();
  }

  toggleSidebar() {
    // this.isSidebarShown.next(!this.isSidebarShown.value);
  }

  addToCart(product: any, showSidebar?: boolean) {
    const items = this.items.value;
    if (this.objectItems[product._id] !== undefined) {
      items[this.objectItems[product._id]].quantity++;
    } else {
      this.objectItems[product._id] = items.length;
      items.push({product, quantity: 1});
    }
    this.items.next(items);
    if (showSidebar === true) {
      this.isSidebarShown.next(true);
    }
  }

  incrementQty(productId: string) {
    const items = this.items.value as any;
    items[this.objectItems[productId]].quantity++;
    this.items.next(items);
  }

  decrementQty(productId: string) {
    const items = this.items.value as any;
    items[this.objectItems[productId]].quantity--;
    this.items.next(items);
  }

  deleteItem(id) {
    const items = this.items.value as any;
    items.splice(this.objectItems[id], 1);
    delete this.objectItems[id];
    this.items.next(items);
  }
}
