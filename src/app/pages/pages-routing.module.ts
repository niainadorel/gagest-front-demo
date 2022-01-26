import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { IsSignedInGuard } from '../@core/guards/is-signed-in.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '', redirectTo: 'products', pathMatch: 'full'
      },
      {
        path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
        canActivate: [IsSignedInGuard]
      },
      {
        path: 'entres', loadChildren: () => import('./entry/entry.module').then(m => m.EntryModule),
        canActivate: [IsSignedInGuard]

      },
      {
        path: 'sorties', loadChildren: () => import('./sortie/sortie.module').then(m => m.SortieModule),
        canActivate: [IsSignedInGuard]

      },
      {
        path: 'clients', loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
        canActivate: [IsSignedInGuard]
      },
      {
        path: 'inventaire', loadChildren: () => import('./inventaire/inventaire.module').then(m => m.InventaireModule),
        canActivate: [IsSignedInGuard]
      },
      {
        path: 'commandes', loadChildren: () => import('./commandes/commandes.module').then(m => m.CommandesModule),
        canActivate: [IsSignedInGuard]
      },
      {
        path: 'colis', loadChildren: () => import('./colis/colis.module').then(m => m.ColisModule),
        canActivate: [IsSignedInGuard]
      },
      {
        path: 'fournisseur', loadChildren: () => import('./fournisseur/fournisseur.module').then(m => m.FournisseurModule)
      },
      {
        path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        canActivate: [IsSignedInGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
