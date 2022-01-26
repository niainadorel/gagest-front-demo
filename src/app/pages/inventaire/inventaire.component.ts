import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService, ProductsService, CategoriesService } from '../../@core/services';
import { ModifDialogComponent } from './modif-dialog/modif-dialog.component';
import { NbDialogService } from '@nebular/theme';
import * as moment from 'moment';

@Component({
  selector: 'app-inventaire',
  templateUrl: './inventaire.component.html',
  styleUrls: ['./inventaire.component.scss']
})
export class InventaireComponent implements OnInit {
  loading = false;
  productsList: any[];
  products: any[];
  productsByCategories: any;
  moreItems: any[] = [];
  categories: string[];
  category = 'all';
  rows: any[];
  originalData: any[];
  sorts = [];
  temp = [];

  @ViewChild('productTable', {static: false}) productTable: any;
  constructor(
    private router: Router,
    private rqs: RequestService,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private dialogService: NbDialogService,

  ) {
    this.loadProducts();
    this.loadCategories();
  }

  ngOnInit() {
    moment.locale('fr');
  }

  fromNow(date) {
    return moment(date).fromNow();
  }

  // change de page selon le lien passé en paramètre
  goTo(link: string) {
    this.router.navigate(['/pages/products/' + link]);
  }

  // Charge tous les catégories depuis la base de donnée
  loadCategories() {
    this.categoriesService.categories.subscribe(c => this.categories = c);
  }

  // Charge tous les produits depuis la base de donnée
  loadProducts() {
    this.productsService.products.subscribe(p => {
      const mounth = 30 * 24 * 1600;
      const OneMounthAgo = Date.now() - mounth;
      let lastCheck;

      const lastMounthUncked = p.filter(el => {
        lastCheck = new Date(el.lastCheck);
        return lastCheck.getTime() < OneMounthAgo;
      });
      this.products = lastMounthUncked;
      if (p) {
        this.treatProducts();
        this.rows = [...lastMounthUncked];
      }
      this.originalData = [...lastMounthUncked];
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
    this.temp = [...this.products];
    this.originalData = this.temp;
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
    this.loading = true;
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
    this.rows = [...results];
    this.originalData = [...results];
    this.loading = false;

  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    if (!val) {
      this.treatProducts();
      return;
    }
    const temp = this.originalData.filter( (d) => {
      return (d.title.toLowerCase().indexOf(val) !== -1
      || d.category.toLowerCase().indexOf(val) !== -1);
    });

    this.rows = [...temp];
    this.productTable.offset = 0;
  }

  showEditInput(OldProduct: any, productIndex: number) {
    this.dialogService.open(ModifDialogComponent, {context: {
      data: {
        callback: (newQuantity: any, changementCause, modifier) => {
          if (newQuantity === OldProduct.quantity) {
            return;
          }
          const update = {
            _id: OldProduct._id,
            quantity: newQuantity,
            changementCause,
            modifier
          };
          this.rqs.updateProduct(update).then(res => {
            OldProduct.quantity = newQuantity;
            OldProduct.changementCause = changementCause;
            OldProduct.modifier = modifier;
            this.products[OldProduct.globalId] = OldProduct;
            this.rows[productIndex] = OldProduct;
            this.productsService.products.next(this.products);
            this.rows = [...this.rows];
          });
        },
        edit: true,
        item: OldProduct
      }
    }});
  }

  validateProduct(productId, globalId) {
    this.loading = true;
    this.rqs.validateProduct(productId).then((res) => {
      console.log(globalId);
      this.products.splice(globalId, 1);
      this.treatProducts();
      this.rows = [...this.products];
      this.loading = false;
    });
  }

  goToDetail(pId) {
    this.router.navigate(['pages/products/details/' + pId]);
  }
}

