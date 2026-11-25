import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompeticionList } from './competiciones/competicion-list/competicion-list';
import { CompeticionForm } from './competiciones/competicion-form/competicion-form';

const routes: Routes = [
  { path: '', redirectTo: 'competiciones', pathMatch: 'full' },
  { path: 'competiciones/nueva', component: CompeticionForm },
  { path: 'competiciones', component: CompeticionList },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
