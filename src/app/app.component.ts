import { Component } from '@angular/core';
import { SessionService } from './@core/services';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GaGest.io';

  constructor(
    private session: SessionService,
  ) {
    this.session.tryInit();
  }
}

