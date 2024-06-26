import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { RouterModule } from '@angular/router';
import { LancamentosRoutingModule } from './lancamentos-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule  } from 'primeng/fileupload'



@NgModule({
  declarations: [
    LancamentoCadastroComponent,
    LancamentosGridComponent,
    LancamentosPesquisaComponent
],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    InputNumberModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    FileUploadModule,

    SharedModule,
    LancamentosRoutingModule
  ],
  exports: []
})
export class LancamentosModule { }
