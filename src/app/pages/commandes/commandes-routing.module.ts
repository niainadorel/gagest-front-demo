import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommandesComponent } from './commandes.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
  { path: '', component: CommandesComponent },
  { path: 'details/:id', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandesRoutingModule { }
