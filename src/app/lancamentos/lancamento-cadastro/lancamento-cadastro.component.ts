import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { CategoriasService } from 'src/app/categorias/categorias.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from 'src/app/core/model';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

    tipos = [
        { label: 'Receita', value: 'RECEITA'},
        { label: 'Despesa', value: 'DESPESA'},
    ];

    categorias: any = [];

    pessoas: any = [];

    lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriasService,
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(lancamentoForm: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
    .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' })

        lancamentoForm.reset();
        this.lancamento = new Lancamento();
    }).catch(erro => this.errorHandler.handle(erro))
  }

  carregarCategorias(){
    return this.categoriaService.listarTodas().then(categorias => {
        this.categorias = categorias.map((c: any) => {
            return {label: c.nome, value: c.codigo}
        });

    }).catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas().then(pessoas => {
        this.pessoas = pessoas.map((p: any) => {
            return {label: p.nome, value: p.codigo}
        })
    }).catch(erro => this.errorHandler.handle(erro));

  }


}
