import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarcaModule } from './modules/marca';
import { HeaderComponent } from './components/header';
import { FooterComponent } from './components/footer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { NotificationSuccessComponent } from './components/notification-success/notification-success.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, ConfirmationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarcaModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
