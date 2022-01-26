import { Component, OnInit } from '@angular/core';
import { RequestService, CategoriesService } from '../../../@core/services';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  loading: any = false;
  categorieValue: string;
  errorSaving = false;
  categories = [];
  constructor(
    private rqs: RequestService,
    private cts: CategoriesService
  ) {
    this.rqs.getCategories().then((res) => {
      this.categories = res.data.categories.reverse();
    });
  }

  ngOnInit() {
  }

  saveCategory() {
    this.errorSaving = false;
    this.loading = true;
    this.rqs.addCategory(this.categorieValue).then((res: any) => {
      this.loading = false;
      if (res && !res.success) {
        this.errorSaving = true;
      } else {
        this.categories = [this.categorieValue, ...this.categories];
        this.categorieValue = '';
        console.log(res);
        this.cts.load();
      }
    });
  }

  deleteCategory(category) {
    this.loading = true;
    console.log('Deleting ===>', category);
    this.rqs.deleteCategorie(category).then(res => {
      if (res.success) {
        this.rqs.getCategories().then((res2) => {
          this.categories = res2.data.categories.reverse();
          this.loading = false;
          this.cts.load();
        });
      }
    });
  }

}
