import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import localePt from '@angular/common/locales/pt';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { LancamentoService } from '../lancamentos/lancamento.service';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    DatePipe,
    {provide: LOCALE_ID, useValue: 'pt-BR' },
    MessageService, ConfirmationService, LancamentoService, {provide: LOCALE_ID, useValue:'pt-BR'}
  ]
})

export class CoreModule {}
