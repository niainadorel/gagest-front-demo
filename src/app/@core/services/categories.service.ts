import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categories: BehaviorSubject<any>;
  constructor(
    private rqs: RequestService
  ) {
    this.categories = new BehaviorSubject(null);
    this.categories.asObservable();
    this.load();
  }

  load() {
    this.rqs.getCategories().then(res => {
      this.categories.next(res.data.categories);
    });
  }
}
