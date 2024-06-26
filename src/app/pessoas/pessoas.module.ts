import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from '../shared/shared.module';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { PessoaCadastroContatoComponent } from './pessoa-cadastro-contato/pessoa-cadastro-contato.component'



@NgModule({
  declarations: [
    PessoasCadastroComponent,
    PessoasPesquisaComponent,
    PessoasGridComponent,
    PessoaCadastroContatoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PanelModule,
    DialogModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,

    SharedModule,
    PessoasRoutingModule
  ],
  exports: []
})
export class PessoasModule { }
