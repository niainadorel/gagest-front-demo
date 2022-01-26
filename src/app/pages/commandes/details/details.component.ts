import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../../@core/services';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  commande: unknown;
  statusText = {
    pending: 'En attente',
    inDelivering: 'En cours de livraison',
    delivered: 'Livrée'
  };
  constructor(
    private route: ActivatedRoute,
    private rqs: RequestService
  ) {
    this.route.params.subscribe(params => {
      this.rqs.getOneCommande(params.id).then(c => {
        this.commande = c.data;
      });
    });
  }

  ngOnInit() {
  }

}
