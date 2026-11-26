import { provideHttpClient } from '@angular/common/http';
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CompeticionList } from './competiciones/competicion-list/competicion-list';
import { CompeticionForm } from './competiciones/competicion-form/competicion-form';
import { CompeticionDetail } from './competiciones/competicion-detail/competicion-detail';
import { AutoList } from './autos/auto-list/auto-list';
import { AutoForm } from './autos/auto-form/auto-form';
import { Home } from './home/home';

@NgModule({
  declarations: [App, CompeticionList, CompeticionForm, CompeticionDetail, AutoList, AutoForm, Home],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
