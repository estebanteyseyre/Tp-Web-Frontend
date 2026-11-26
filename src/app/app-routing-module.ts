import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompeticionList } from './competiciones/competicion-list/competicion-list';
import { CompeticionForm } from './competiciones/competicion-form/competicion-form';
import { CompeticionDetail } from './competiciones/competicion-detail/competicion-detail';
import { AutoList } from './autos/auto-list/auto-list';
import { AutoForm } from './autos/auto-form/auto-form';
import { Home } from './home/home';

const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'competiciones/nueva', component: CompeticionForm },
  { path: 'competiciones/editar/:id', component: CompeticionForm },
  { path: 'competiciones/:id', component: CompeticionDetail },
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
