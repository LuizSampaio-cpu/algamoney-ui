import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import localePt from '@angular/common/locales/pt';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService, TranslationKeys } from 'primeng/api';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../seguranca/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NaoAutorizadoComponent } from './nao-autorizado.component';


registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule,

  ],
  providers: [
    DatePipe,
    {provide: LOCALE_ID, useValue: 'pt-BR' },
    MessageService, ConfirmationService, Title, AuthService, JwtHelperService, LancamentoService, {provide: LOCALE_ID, useValue:'pt-BR'}
  ]
})

export class CoreModule {}
