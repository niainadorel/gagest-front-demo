import { Component, OnInit, ViewChild } from '@angular/core';
import { NbSidebarService, NbDialogService, NbThemeService } from '@nebular/theme';
import { DataService, RequestService, SessionService } from '../@core/services';
import { UserDialogComponent } from '../components/user-dialog/user-dialog.component';
import { PasswordDialogComponent } from '../components/password-dialog/password-dialog.component';
import { Router, NavigationEnd } from '@angular/router';

import { NbPopoverDirective } from '@nebular/theme';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  user: any;
  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
  menuItems: any;
  alertNotifLength = 0;
  notificationsLength: any = 0;
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    }
  ];

  themeToggle = false;

  currentTheme = 'default';


  @ViewChild('disconnectOrderSwal', {static: true}) disconnectNotif: any;
  constructor(
    private sidebarService: NbSidebarService,
    public dts: DataService,
    private dialogService: NbDialogService,
    private rqs: RequestService,
    private session: SessionService,
    private router: Router,
    private themeService: NbThemeService
  ) {
    this.dts.menu.subscribe(m => {
      console.log(m);
      this.menuItems = m;
    });
    this.dts.user.subscribe(u => {
      if (u && u.name) {
        this.rqs.checkQty().then(resQ => {
          console.log('qty', resQ);
          if (resQ && resQ.success) {
            if (resQ.data && resQ.data.length) {
              this.alertNotifLength = resQ.data.length;
              this.dts.alertNotif.next(resQ.data);
            }
            this.rqs.getNotification().then(res => {
              if (res && res.success) {
                console.log('pagesCompo =====', res.data);
                this.dts.notifications.next(res.data);
              }
            });
          }
        });
      }
      this.user = u;
    });
    this.dts.notifications.subscribe(n => {
      this.notificationsLength = n.filter(notif => notif.seen === false).length + this.alertNotifLength;
    });
    this.dts.onNewCommande.subscribe(m => {
      this.rqs.getNotification().then(res => {
        if (res && res.success) {
          this.dts.notifications.next(res.data);
        }
      });
    });
    this.dts.onDisconectOrder.subscribe(m => {
      console.log('orderrrr');
      this.disconnectNotif.fire();
    });
    this.dts.onShouldCheckQty.subscribe(m => {
      this.rqs.checkQty().then(resQ => {
        if (resQ && resQ.success) {
          if (resQ.data) {
            this.alertNotifLength = resQ.data.length;
            this.dts.alertNotif.next(resQ.data);
            this.dts.notifications.next(this.dts.notifications.value);
          }
        }
      });
    });
    this.router.events.subscribe(el => {
      if (el instanceof NavigationEnd) {
        this.dts.menu.next(this.dts.menu.value.map(menu => {
        if (menu.link[0] === el.url) {
          menu.selected = true;
        } else {
          menu.selected = false;
        }
        return menu;
      }));
      }
    });
  }
  ngOnInit() {
    if (localStorage.getItem('_boba_theme') === 'dark') {
      this.themeToggle = true;
      document.querySelector('body').classList.add('dark');
    }
  }
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  openUserDialog() {
    this.dialogService.open(UserDialogComponent, {context: {
      data: {
        callback: (userdata: any) => {
          const updated: any = {};
          let somethingUpDated = false;
          for (const key in userdata) {
            if (userdata[key] !== this.user[key]) {
              updated[key] = userdata[key];
              somethingUpDated = true;
            }
          }
          if (!somethingUpDated) {
            return;
          }
          this.rqs.updateUser(updated).then((res) => {
            this.dts.user.next(Object.assign(this.user, updated));
          });

        },
        edit: true,
        item: this.user
      }
    }});
  }

  openPasswordDialog() {
    this.dialogService.open(PasswordDialogComponent, {context: {
      data: {
        edit: true,
        userEmail: this.user.email
      }
    }});
  }

  closePop() {
    this.popover.hide();
  }
  logout() {
    localStorage.removeItem('_boba_i');
    localStorage.removeItem('_boba_token');
    this.dts.leaveSocket();
    this.dts.user.next(null);
    this.dts.products.next(null);
    this.dts.categories.next(null);
    this.dts.notifications.next([]);
    this.session.setSession(false);
    this.router.navigate(['/auth/login']);
  }
  changeTheme() {
    const body = document.querySelector('body');
    if (this.themeToggle) {
      body.classList.add('dark');
      localStorage.setItem('_boba_theme', 'dark');
    } else {
      localStorage.setItem('_boba_theme', 'light');
      body.classList.remove('dark');
    }
  }

}
