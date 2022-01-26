import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { NewFournisseurDialogComponent } from './new-fournisseur-dialog/new-fournisseur-dialog.component';
import { Router } from '@angular/router';
import { RequestService } from '../../@core/services';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss']
})
export class FournisseurComponent implements OnInit {
  loading = false;
  fournisseurList: any[];
  fournisseur: any[];
  fournisseurByCategories: any;
  pageSize: number;
  p: number;
  moreItems: any[] = [];
  categories: string[];
  category = 'all';
  rows: any[];
  sorts = [];
  inShowDetail: any;
  temp = [];
  @ViewChild('fournisseurTable', {static: false}) fournisseurTable: DatatableComponent;
  constructor(
    private dialogService: NbDialogService,
    private router: Router,
    private rqs: RequestService,

  ) {
    this.loading = true;
    this.loadFournisseur();
  }

  ngOnInit() {
  }


  // Charge tous les produits depuis la base de donnée
  loadFournisseur() {
    this.rqs.getFournisseurs().then(res => {
      if (res && res.success) {
        this.fournisseur = res.data;
        this.treatFournisseur();
        this.rows = [...this.fournisseur];
        this.loading = false;
      }
    });
  }

  // Traite les produits de façon à les séparés par catégories
  treatFournisseur() {
    this.fournisseur = this.fournisseur.map((fournisseur, index) => {
      fournisseur.globalId = index;
      return fournisseur;
    });
    this.temp = [...this.fournisseur];
  }

  // Filtre les produits par catégories

  // Ouvre le modale d'edition de produit
  openEditFournisseurDialog(OldFournisseur: any, fournisseurIndex: number) {
    this.dialogService.open(NewFournisseurDialogComponent, {context: {
      data: {
        callback: (newFournisseur: any) => {
          const updated: any = {};
          let somethingUpDated = false;
          for (const key in newFournisseur) {
            if (newFournisseur[key] !== OldFournisseur[key]) {
              updated[key] = newFournisseur[key];
              somethingUpDated = true;
            }
          }
          if (!somethingUpDated) {
            return;
          }
          updated._id = OldFournisseur._id;
          this.rqs.updateFournisseur(updated).then((res) => {
            console.log(res);
            newFournisseur = Object.assign(OldFournisseur, newFournisseur);
            this.fournisseur[newFournisseur.globalId] = newFournisseur;
            this.rows[fournisseurIndex] = newFournisseur;
            this.rows = [...this.rows];
          });
        },
        edit: true,
        item: OldFournisseur
      }
    }});
  }

  // Ouvre le modale d'ajout de produit
  openNewFournisseurDialog() {
    this.dialogService.open(NewFournisseurDialogComponent, {context: {
      data: {
        callback: (data: any) => {
          this.loading = true;
          this.rqs.saveFournisseur(data).then((response: any) => {
            this.loading = false;
            console.log(response);
            if (response && response.success) {
              data._id = response._id;
              data.status = 'enabled';
              this.fournisseur.unshift(data);
              this.treatFournisseur();
              this.rows = [...this.fournisseur];
            }
          });
        }
      }
    }});
  }

  showDetails(product) {
    this.inShowDetail = product;
  }

  updateStatus(newValue, fournisseurId, fournisseurIndex) {
    const newFournisseur = {
      status: newValue,
      _id: fournisseurId
    };
    console.log(fournisseurIndex);
    this.loading = true;
    this.rqs.updateFournisseur(newFournisseur).then(res => {
      if (res) {
        console.log(res);
        this.rows[fournisseurIndex].status = newValue;
        this.rows = [...this.rows];
        if (this.inShowDetail && fournisseurIndex === this.inShowDetail.globalId) {
          this.inShowDetail.status = newValue;
        }
        this.loading = false;
       }
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter( (d) => {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    this.fournisseurTable.offset = 0;
  }

}

