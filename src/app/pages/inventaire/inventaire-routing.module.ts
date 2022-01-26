import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventaireComponent } from './inventaire.component';


const routes: Routes = [
  { path: '', component: InventaireComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventaireRoutingModule { }
