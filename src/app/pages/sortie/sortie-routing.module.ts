import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SortieComponent } from './sortie.component';


const routes: Routes = [
  {path : '', component: SortieComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SortieRoutingModule { }
