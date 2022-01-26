import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: BehaviorSubject<any>;
  constructor(
    private rqs: RequestService
  ) {
    this.products = new BehaviorSubject(null);
    this.products.asObservable();
    this.load();
  }

  load() {
    this.rqs.getProducts().then(res => {
      this.products.next(res.data);
    });
  }
}
