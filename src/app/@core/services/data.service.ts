import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  user: BehaviorSubject<any>;
  products: BehaviorSubject<any>;
  categories: BehaviorSubject<any>;
  refreshEvent: any;
  onNewCommande: Observable<any>;
  onDisconectOrder: Observable<any>;
  notifications: BehaviorSubject<any>;
  alertNotif: BehaviorSubject<any>;
  onShouldCheckQty: Observable<any>;
  menu: BehaviorSubject<any>;
  activeLinks = [];
  constructor(
    public socket: Socket
  ) {
    this.user = new BehaviorSubject({});
    this.products = new BehaviorSubject(null);
    this.categories = new BehaviorSubject(null);
    this.notifications = new BehaviorSubject([]);
    this.alertNotif = new BehaviorSubject([]);
    this.menu = new BehaviorSubject([
      {
        title: 'Liste des produits',
        icon: 'cube-outline',
        link: ['/pages/products'],
      },
      {
        title: 'Catégories des produits',
        icon: 'list-outline',
        link: ['/pages/products/categories']
      },
    ]);
    this.products.asObservable();
    this.categories.asObservable();
    this.user.asObservable();
    this.notifications.asObservable();
    this.alertNotif.asObservable();
    this.menu.asObservable();
    this.onNewCommande = this.socket.fromEvent<any>('new_commande');
    this.onDisconectOrder = this.socket.fromEvent<any>('disconnect_user');
    this.onShouldCheckQty = this.socket.fromEvent<any>('should_check_quantity');
  }
  saveSocket(userId = this.user.value._id) {
    this.socket.emit('save_socket', userId);
  }
  leaveSocket() {
    this.socket.emit('leave_room', this.user.value._id);
  }
  canGo(link) {
    console.log('cangoooo', link);
    const bool = !!(this.menu.value.filter(el => el.link[0].substr(7) === link)).length;
    const canGo = bool;
    return canGo;
  }
}
