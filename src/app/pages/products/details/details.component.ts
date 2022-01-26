import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../@core/services';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  product: any;
  constructor(
    private rqs: RequestService,
    private route: ActivatedRoute
  ) {
      this.route.params.subscribe(params => {
        this.rqs.getOneProduct(params.index).then((res: any) => {
          if (res && res.success) {
            this.product = res.data;
          }
        });
      });
  }

  ngOnInit() {
  }

}
