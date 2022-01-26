import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { RequestService, DataService } from '../../@core/services';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import * as moment from 'moment';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss', '../client/client.component.scss']
})
export class CommandesComponent implements OnInit {
  loading = false;
  commandeList: any[];
  commande: any[];
  commandeByCategories: any;
  pageSize: number;
  p: number;
  moreItems: any[] = [];
  categories: string[];
  category = 'all';
  rows: any[];
  sorts = [];
  inShowDetail: any;
  temp = [];
  refresh = false;
  @ViewChild('commandeTable', {static: false}) commandeTable: DatatableComponent;
  constructor(
    private dialogService: NbDialogService,
    private router: Router,
    private rqs: RequestService,
    private dts: DataService

  ) {
    this.loading = true;
    this.dts.onNewCommande.subscribe(d => {
      console.log('newwwwwwwwwwwwwwwwwww', d);
    });
    this.loadCommandes();
  }

  ngOnInit() {
    moment.locale('fr');
  }

  fromNow(date) {
    return moment(date).fromNow();
  }

  refreshFunc() {
    this.rqs.getCommandes().then(res => {
      if (res && res.success) {
        console.log(res);
        this.commande = res.data;
        this.treatCommandes();
        this.rows = [...this.commande];
        this.refresh = false;
        this.loading = false;
      }
    });
  }


  // Charge tous les produits depuis la base de donnée
  loadCommandes() {
    this.rqs.getCommandes().then(res => {
      if (res && res.success) {
        console.log(res);
        this.commande = res.data;
        this.treatCommandes();
        this.rows = [...this.commande];
        this.loading = false;
      }
    });
  }

  // Traite les produits de façon à les séparés par catégories
  treatCommandes() {
    this.commande = this.commande.map((commande, index) => {
      commande.globalId = index;
      return commande;
    });
    this.temp = [...this.commande];
  }


  showDetails(product) {
    this.router.navigate(['/pages/commandes/details', product._id]);
  }

  updateStatus(newValue, commande, commandeIndex) {
    console.log('change');
    this.loading = true;
    const newCommandes = {
      status: newValue,
      _id: commande._id,
      sortieCreated: true
    };
    if ( !commande.sortieCreated ) {
      this.rqs.decreaseProducts(commande.products).then(temp1 => {
        const sortie = {
          client: commande.client._id,
          products: commande.products,
          remise: commande.remise,
          tva: commande.tva,
          totalPrice: commande.totalPrice
        };
        this.rqs.addSortie(sortie).then(temp => {
          this.rqs.updateCommande(newCommandes).then(res => {
            if (res) {
              console.log(res);
              this.rows[commandeIndex].status = newValue;
              this.rows[commandeIndex].sortieCreated = true;
              this.rows = [...this.rows];
              if (this.inShowDetail && commandeIndex === this.inShowDetail.globalId) {
                this.inShowDetail.status = newValue;
              }
              this.loading = false;
             }
          });
        });
      });
    }

  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter( (d) => {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    this.commandeTable.offset = 0;
  }

}

