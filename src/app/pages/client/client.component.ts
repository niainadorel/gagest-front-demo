import { Component, OnInit, ViewChild } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { NewClientDialogComponent } from './new-client-dialog/new-client-dialog.component';
import { Router } from '@angular/router';
import { RequestService } from '../../@core/services';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  loading = false;
  clientList: any[];
  client: any[];
  clientByCategories: any;
  pageSize: number;
  p: number;
  moreItems: any[] = [];
  categories: string[];
  category = 'all';
  rows: any[];
  sorts = [];
  inShowDetail: any;
  temp = [];
  @ViewChild('clientTable', {static: false}) clientTable: DatatableComponent;
  constructor(
    private dialogService: NbDialogService,
    private router: Router,
    private rqs: RequestService,

  ) {
    this.loading = true;
    this.loadClient();
  }

  ngOnInit() {
  }


  // Charge tous les produits depuis la base de donnée
  loadClient() {
    this.rqs.getClients().then(res => {
      if (res && res.success) {
        this.client = res.data;
        this.treatClient();
        this.rows = [...this.client];
        this.loading = false;
      }
    });
  }

  // Traite les produits de façon à les séparés par catégories
  treatClient() {
    this.client = this.client.map((client, index) => {
      client.globalId = index;
      return client;
    });
    this.temp = [...this.client];
  }

  // Filtre les produits par catégories

  // Ouvre le modale d'edition de produit
  openEditClientDialog(OldClient: any, clientIndex: number) {
    this.dialogService.open(NewClientDialogComponent, {context: {
      data: {
        callback: (newClient: any) => {
          const updated: any = {};
          let somethingUpDated = false;
          for (const key in newClient) {
            if (newClient[key] !== OldClient[key]) {
              updated[key] = newClient[key];
              somethingUpDated = true;
            }
          }
          if (!somethingUpDated) {
            return;
          }
          updated._id = OldClient._id;
          this.rqs.updateClient(updated).then((res) => {
            console.log(res);
            newClient = Object.assign(OldClient, newClient);
            this.client[newClient.globalId] = newClient;
            this.rows[clientIndex] = newClient;
            this.rows = [...this.rows];
          });
        },
        edit: true,
        item: OldClient
      }
    }});
  }

  // Ouvre le modale d'ajout de produit
  openNewClientDialog() {
    this.dialogService.open(NewClientDialogComponent, {context: {
      data: {
        callback: (data: any) => {
          this.loading = true;
          this.rqs.saveClient(data).then((response: any) => {
            this.loading = false;
            console.log(response);
            if (response && response.success) {
              data._id = response._id;
              data.status = 'enabled';
              this.client.unshift(data);
              this.treatClient();
              this.rows = [...this.client];
            }
          });
        }
      }
    }});
  }

  showDetails(product) {
    this.inShowDetail = product;
  }

  updateStatus(newValue, clientId, clientIndex) {
    const newClient = {
      status: newValue,
      _id: clientId
    };
    console.log(clientIndex);
    this.loading = true;
    this.rqs.updateClient(newClient).then(res => {
      if (res) {
        console.log(res);
        this.rows[clientIndex].status = newValue;
        this.rows = [...this.rows];
        if (this.inShowDetail && clientIndex === this.inShowDetail.globalId) {
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
    this.clientTable.offset = 0;
  }

}

