import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColisComponent } from './colis.component';


const routes: Routes = [
  { path: '', component: ColisComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColisRoutingModule { }
