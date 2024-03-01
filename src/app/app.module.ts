import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';


import { AppRoutingModule } from './app-routing.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    HttpClientModule,

    CoreModule,
    SegurancaModule,

    AppRoutingModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
