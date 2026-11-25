import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompeticionList } from './competiciones/competicion-list/competicion-list';
import { CompeticionForm } from './competiciones/competicion-form/competicion-form';
import { AutoList } from './autos/auto-list/auto-list';
import { AutoForm } from './autos/auto-form/auto-form';

const routes: Routes = [
  { path: '', redirectTo: 'competiciones', pathMatch: 'full' },
  { path: 'competiciones/nueva', component: CompeticionForm },
  { path: 'competiciones/editar/:id', component: CompeticionForm },
  { path: 'competiciones', component: CompeticionList },
  { path: 'autos/nuevo', component: AutoForm },
  { path: 'autos/editar/:id', component: AutoForm },
  { path: 'autos', component: AutoList },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
