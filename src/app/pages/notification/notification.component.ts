import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestService, DataService } from '../../@core/services';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PagesComponent } from '../pages.component';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications: any;
  commandesNotif: any = [];
  alertNotif: any = [];
  dangerNotif: any = [];
  constructor(
    private rqs: RequestService,
    private dts: DataService,
    private router: Router,
    private pageC: PagesComponent
  ) {
    this.dts.notifications.subscribe(n => {
      if (n && n.length) {
        this.commandesNotif = n.reverse();
        this.reajustNotif();
      }
    });
    this.dts.alertNotif.subscribe(n => {
      if (n && n.length) {
        this.treatAlert(n);
      }
    });
    moment.locale('fr');
  }

  ngOnInit() {
  }

  treatAlert(alertData) {
    const alertProduct = [];
    const dangerProduct = [];
    for (const d of alertData) {
      if (d.quantity <= d.stockMinimum) {
        dangerProduct.push(d);
      } else {
        alertProduct.push(d);
      }
    }
    this.alertNotif = alertProduct;
    this.dangerNotif = dangerProduct;
    this.reajustNotif();
  }

  reajustNotif() {
    this.notifications = [...this.commandesNotif, ...this.alertNotif, ...this.dangerNotif];
  }

  fromNow(date) {
    return moment(date).fromNow();
  }

  goToCommande(notifId, commandeId) {
    this.rqs.updateNotification({_id: notifId, seen: true}).then(m => {
      this.rqs.getNotification().then(res => {
        this.dts.notifications.next(res.data);
      });
    });
    this.pageC.closePop();
    this.router.navigate(['/pages/commandes/details', commandeId]);
  }
  goToDetailProduct(id) {
    this.pageC.closePop();
    this.router.navigate(['/pages/products/details', id]);
  }

}
