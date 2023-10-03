import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarcaModule } from './modules/marca';
import { HeaderComponent } from './components/header';
import { FooterComponent } from './components/footer';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, MarcaModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
