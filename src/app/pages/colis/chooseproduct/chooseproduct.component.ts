import { Component, OnInit } from '@angular/core';
import { RequestService, ProductsService, CategoriesService } from '../../../@core/services';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-chooseproduct',
  templateUrl: './chooseproduct.component.html',
  styleUrls: ['./chooseproduct.component.scss', '../../products/products.component.scss']
})
export class ChooseproductComponent implements OnInit {
  loading = false;
  productsList: any[];
  products: any[];
  productsByCategories: any;
  pageSize: number;
  p: number;
  moreItems: any[] = [];
  someElementsAreChecked: boolean;
  allElementsAreChecked: boolean;
  categories: string[];
  category = 'all';
  data: any;
  constructor(
    private rqs: RequestService,
    public dialog: NbDialogRef<ChooseproductComponent>,
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {
    this.pageSize = 10;
    this.loadProducts();
    this.loadCategories();
  }

  ngOnInit() {
  }

    // Charge tous les catégories depuis la base de donnée
  loadCategories() {
    this.categoriesService.categories.subscribe(c => this.categories = c);
  }

  // Charge tous les produits depuis la base de donnée
  loadProducts() {
    this.productsService.products.subscribe(p => {
      this.products = p;
      if (p !== null) {
        this.treatProducts();
        if (this.category === 'all') {
          this.productsList = [... this.products];
        } else {
          this.productsList = [...this.productsByCategories[this.category]];
        }
        console.log('list', this.productsList);
      }
    });
  }

  // Traite les produits de façon à les séparés par catégories
  treatProducts() {
    this.productsByCategories = {};
    this.products = this.products.map((product, index) => {
      if (this.productsByCategories[product.category]) {
        product.inCategoriesIndex = this.productsByCategories[product.category].length;
        this.productsByCategories[product.category].push(product);
      } else {
        product.inCategoriesIndex = 0;
        this.productsByCategories[product.category] = [product];
      }
      product.globalId = index;
      return product;
    });
  }

  // Filtre les produits par mots clefs | recherche côté client
  filterProducts() {
    const searchInput = document.querySelector('#searchInput') as any;
    let keywords = searchInput.value;
    console.log(keywords);
    if (!keywords.trim()) {
      this.filterByCategories(this.category);
      searchInput.value = '';
    } else {
      this.loading = true;
      let results = [];
      let maxWeight = 0;
      let productsResult;
      keywords = keywords.toLowerCase();

      if (this.category === 'all') {
        productsResult = [...this.products];
      } else {
        if (this.productsByCategories[this.category]) {
          productsResult = [...this.productsByCategories[this.category]];
        } else {
          productsResult = [];
        }
      }

      for (const product of productsResult) {
        let weight = 0; // count all match key in product
        const productString = `${product.title} ${product.price} ${product.category}`;
        console.log(productString);
        for (const key of keywords.split(' ')) {
          if (productString.toLowerCase().indexOf(key) !== -1) {
            weight++;
          }
        }
        if (weight) {
          product.weight = weight;
          maxWeight = weight > maxWeight ? weight : maxWeight;
          results.push(product);
        }
      }
      // the next line sort the results array by descending order of weight
      // results.sort((a, b) => ((a.weight < b.weight) ? 1 : (a.weight > b.weight) ? -1 : 0));

      // get only results with maxWeight
      results = results.filter(r => r.weight === maxWeight);
      this.productsList = [...results];
      searchInput.value = '';
      this.loading = false;
    }

  }
  // Filtre les produits par catégories
  filterByCategories($event) {
    this.category = $event;
    console.log(this.category);
    let results = [];
    if (this.category === 'all') {
      results = [...this.products];
    } else {
      // results = this.products.filter(p => p.categorie === this.categorie);
      if (this.productsByCategories[this.category]) {
        results = [...this.productsByCategories[this.category]];
      } else {
        results = [];
      }
    }
    this.productsList = [...results];
  }

  selectElement(product) {
    this.data.callback(product);
    this.dialog.close();
  }

}
