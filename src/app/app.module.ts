import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast'
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule} from 'primeng/confirmdialog'


import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';
import { LancamentoService } from './lancamentos/lancamento.service';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,


    LancamentosModule,
    PessoasModule,
    CoreModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
