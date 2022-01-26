import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { NewProductsDialogComponent } from './new-products-dialog/new-products-dialog.component';
import { NbMenuService } from '@nebular/theme';
import { Router } from '@angular/router';
import { RequestService, CartService, ProductsService, CategoriesService, DataService } from '../../@core/services';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
import { NbSidebarService } from '@nebular/theme';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [DatePipe]
})
export class ProductsComponent implements OnInit {
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
  rows: any[];
  originalData: any[];
  sorts = [];
  productsForm: FormGroup;
  ajustExel = false;
  exportsExel = false;
  exportsStep: any;
  exportsStatus: any;
  exportsInprogress: any;
  exelData: any;
  exportProgress: any;
  temp = [];
  categoriesToSave = [];
  onRecalculate = false;
  user: any;
  suggestionData: any;
  @ViewChild('productTable', { static: false }) productTable: DatatableComponent;
  @ViewChild('errorSwal', { static: false }) errorSwal: SwalComponent;
  constructor(
    private dialogService: NbDialogService,
    private nbMenuService: NbMenuService,
    private router: Router,
    private rqs: RequestService,
    private dts: DataService,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private formB: FormBuilder,
    private sidebar: NbSidebarService,
  ) {
    this.someElementsAreChecked = false;
    this.allElementsAreChecked = false;
    this.dts.user.subscribe(u => this.user = u);
    this.loadProducts();
    this.loadCategories();
    this.productsForm = this.formB.group({
      title: ['Nom', Validators.required],
      description: ['Description', Validators.required],
      bought_price: ['Prix d\'achat', Validators.required],
      sell_price: ['Prix de vente', Validators.required],
      // big_quantity_price: [null, Validators.required],
      // minimum_sell_price: [null],
      quantity: ['Quantité', Validators.required],
      unit: ['Unité', Validators.required],
      category: ['Catégorie', Validators.required]
    });
    this.sidebar.onToggle().subscribe(temp => {
      console.log('recalculate');
      this.productTable.recalculateColumns();
      this.onRecalculate = true;
      setTimeout(() => {
        this.onRecalculate = false;
      });
    });
    this.rqs.getFournisseurs().then(res => {
      console.log(res);
      this.suggestionData = res.data;
    });
  }

  ngOnInit() {
    this.nbMenuService.onItemClick()
      .subscribe((event: any) => {
        if (event.item.title === 'editer') {
          this.openEditProductsDialog(event.item.data.product, event.item.data.index);
        } else if (event.item.title === 'supprimer') {
          this.deleteProduct(event.item.data.product);
        }
      });
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
      this.products = p || [];
      if (p) {
        this.treatProducts();
        this.rows = [...p];
        this.originalData = [...this.rows];
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
    this.temp = [...this.products];
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
    this.originalData = results;
    this.loading = false;

  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    if (!val) {
      this.treatProducts();
      return;
    }
    const temp = this.originalData.filter((d) => {
      return (d.title.toLowerCase().indexOf(val) !== -1
        || d.category.toLowerCase().indexOf(val) !== -1);
    });

    this.rows = [...temp];
    this.productTable.offset = 0;
  }

  // Ouvre le modale d'edition de produit
  openEditProductsDialog(OldProduct: any, productIndex: number) {
    this.dialogService.open(NewProductsDialogComponent, {
      context: {
        data: {
          callback: (newProduct: any) => {
            const updated: any = {};
            let somethingUpDated = false;
            for (const key in newProduct) {
              if (OldProduct[key] !== newProduct[key]) {
                updated[key] = newProduct[key];
                somethingUpDated = true;
              }
            }
            if (!somethingUpDated) {
              console.log('nothing');
              return;
            }
            updated._id = OldProduct._id;
            this.loading = true;
            this.rqs.updateProduct(updated).then(res => {
              newProduct = Object.assign(OldProduct, newProduct);
              this.products[OldProduct.globalId] = newProduct;
              this.rows[productIndex] = newProduct;
              this.productsService.products.next(this.products);
              // this.treatProducts();
              this.rows = [...this.rows];
              this.loading = false;

            });
          },
          edit: true,
          item: OldProduct,
          suggestionData: this.suggestionData
        }
      }
    });
  }

  // Ouvre le modale d'ajout de produit
  openProductsDialog() {
    this.dialogService.open(NewProductsDialogComponent, {
      context: {
        data: {
          callback: (data: any) => {
            this.loading = true;
            this.rqs.saveProducts(data).then((response: any) => {
              if (data.newCategorie) {
                this.categoriesService.load();
              }
              this.loading = false;
              console.log(response);
              if (response && response.success) {
                data._id = response._id;
                // this.productsList.unshift(data);
                this.products.unshift(data);
                this.productsService.products.next(this.products);
                this.treatProducts();
              }
            });
          },
          suggestionData: this.suggestionData
        }
      }
    });
  }

  // Affiche | cache les boutons "supprimer tout" et "ajouter tout au panier"
  toggle(toggle: boolean, index: number) {
    this.productsList[index].checked = toggle;
    if (!toggle) {
      this.allElementsAreChecked = false;
      this.checkIfThereAreElementsSelected();
    } else {
      this.someElementsAreChecked = true;
      this.checkIfAllElementsAreSelected();
    }
  }

  // Select tous les produits en vues
  selectAll(toggle: boolean) {
    this.productsList = this.productsList.map((product: any) => {
      product.checked = toggle;
      return product;
    });
    this.someElementsAreChecked = toggle;
  }

  // Verifie s'il y des élements (produits en vues) sélectionnés
  checkIfThereAreElementsSelected() {
    let tempBool = false;
    for (const product of this.productsList) {
      if (product.checked) {
        tempBool = true;
        break;
      }
    }
    this.someElementsAreChecked = tempBool;
  }

  // Verifie si tous les élements (produits en vues) sont sélectionnés
  checkIfAllElementsAreSelected() {
    let tempBool = true;
    for (const product of this.productsList) {
      if (!product.checked) {
        tempBool = false;
        break;
      }
    }
    this.allElementsAreChecked = tempBool;
  }

  // Supprime tous les élements sélectionnés
  deleteSelectedElements() {
    const newProducts: any[] = [];
    const IdProductsToDelete: any[] = [];
    this.loading = true;

    for (const product of this.productsList) {
      if (!product.checked) {
        newProducts.push(product);
      } else {
        this.products.splice(product.globalId, 1);
        IdProductsToDelete.push(product._id);
      }
    }
    console.log(IdProductsToDelete);
    this.rqs.deleteManyProducts(IdProductsToDelete).then(res => {
      console.log(res);
      if (res && res.success) {
        this.productsService.products.next(newProducts);
        this.productsList = newProducts;
        this.someElementsAreChecked = false;
      }
    });
  }

  // Supprime un produits
  deleteProduct(product: any) {
    this.rqs.deleteProducts(product._id).then((res) => {
      this.products.splice(product.globalId, 1);
      this.productsService.products.next(this.products);
      console.log('Products', this.products)
      this.treatProducts();
      if (this.category === 'all') {
        this.productsList = [... this.products];
      } else {
        this.productsList = [...this.productsByCategories[this.category]];
      }
    });
  }

  // Ajout au panier
  // addToCart(product: any) {
  //   this.cts.addToCart(product, true);
  // }

  // addSelectedElementsToCart() {
  //   const selectedProducts = this.productsList.filter(p => p.checked);
  //   for (let i = 0; i < selectedProducts.length - 1; i++) {
  //     this.cts.addToCart(selectedProducts[i], false);
  //   }
  //   this.cts.addToCart(selectedProducts[selectedProducts.length - 1], true);
  //   console.log(selectedProducts);
  // }
  goToDetail(pId) {
    this.router.navigate(['pages/products/details/' + pId]);
  }

  onFileChange(ev) {
    if ( this.user.typeAccount === 1) {
      return;
    }
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    console.log(file.type);
    if (file.type === 'application/vnd.ms-excel' ||
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        this.exelData = jsonData;
        this.ajustExel = true;
      };
      reader.readAsBinaryString(file);
    }
  }

  generateProducts() {
    if (this.user.typeAccount === 1) {
      return;
    }
    this.loading = true;
    let productsBrut = [];
    this.exportsStep = {
      step1: 'undone',
      step2: 'undone',
      step3: 'undone'
    };
    this.exportsInprogress = 'step1';
    const keysNotFound = [];
    for (const sheetIndex in this.exelData) {
      if (true) {
        for (const data of this.exelData[sheetIndex]) {
          const keys = this.productsForm.value;
          const product: any = {};
          for (const key in keys) {
            if (data[keys[key]] !== undefined) {
              product[key] = data[keys[key]];
            } else {
              console.log('Erreur key => ', keys[key], ' not found');
              keysNotFound.push({page: sheetIndex, key: keys[key]});
            }
          }
          productsBrut.push(product);
        }
      }
    }
    if (keysNotFound.length > 0) {
      this.loading = false;
      let textError = '';
      for (const key of keysNotFound) {
        textError += `Colonne "${key.key}" introuvable dans la feuille ${key.page} !\n`;
      }
      this.errorSwal.text = textError;
      this.errorSwal.fire();
    } else {
      productsBrut = productsBrut.map(el => {
        el.sell_price = parseInt(String(el.sell_price).replace(/[ .]/g, ''), 10);
        el.quantity = parseInt(String(el.quantity).replace(/[ .]/g, ''), 10);
        el.bought_price = parseInt(String(el.bought_price).replace(/[ .]/g, ''), 10);
        return el;
      });
      this.loading = false;
      this.exportsExel = true;
      setTimeout(() => {
        this.exportsStep.step1 = 'done';
        this.categoriesToSave = [];
        this.insertManyProducts(productsBrut);
      }, 1500);
    }

  }
  insertManyProducts(products) {
    console.log(products);
    this.exportsInprogress = 'step2';
    console.log(this.user);
    this.exportsStatus = 'Enregistrement des produits dans la base';
    products = products.map((el) => {
      if (this.categoriesToSave.indexOf(el.category) === -1) {
        this.categoriesToSave.push(el.category);
      }
      el.user = this.user._id;
      return el;
    });
    this.rqs.insertManyProducts(products).then(res => {
      if (res && res.success) {
        this.exportsInprogress = 'step3';
        this.exportsStep.step2 = 'done';
        this.exportsStatus = 'Enregistrement automatique des catégories';
        this.rqs.addManyCategories(this.categoriesToSave).then(res2 => {
          this.categoriesService.load();
          this.productsService.load();
          this.ajustExel = false;
          this.exportsExel = false;
          this.loading = false;
          console.log(res2);
        });
      }
    });
  }

  exportToExcel() {
    if (this.user.typeAccount === 1) {
      return;
    }
    console.log('here');
    this.loading = true;
    console.log(this.productsByCategories);
    const workbook = XLSX.utils.book_new();
    // tslint:disable-next-line:forin
    for (const key in this.productsByCategories) {
      const dataToExport = this.productsByCategories[key].map(el => {
        const temp = [];
        temp.push(el.title);
        temp.push(el.description);
        temp.push(el.category);
        temp.push(el.bought_price);
        temp.push(el.sell_price);
        temp.push(el.quantity);
        temp.push(el.unit);
        return temp;
      });
      dataToExport.unshift(['Nom', 'Description', 'Catégorie', 'Prix d\'achat', 'Prix de vente', 'Quantité', 'Unité']);
      const ws = XLSX.utils.aoa_to_sheet(dataToExport);
      XLSX.utils.book_append_sheet(workbook, ws, key);
    }
    const filename = `${this.user.name}-Produits-${new DatePipe('en_US').transform(new Date(), 'dd/MM/yyyy')}.xlsx`;
    XLSX.writeFile(workbook, filename);
    this.loading = false;
  }

}

