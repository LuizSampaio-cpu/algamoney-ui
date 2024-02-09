import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { CategoriasService } from 'src/app/categorias/categorias.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from 'src/app/core/model';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
    private route: ActivatedRoute,
    private router: Router,
     private title: Title) { }

  ngOnInit(): void {

    const codigoLancamento = this.route.snapshot.params['codigo'];

    if(codigoLancamento && codigoLancamento !== 'novo'){
        this.carregarLancamento(codigoLancamento);
    }
    this.carregarCategorias();
    this.carregarPessoas();

    this.title.setTitle('Cadastro de lancamentos')
  }

  get editando() {
    return Boolean(this.lancamento.codigo)
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscaPorCodigo(codigo).then(lancamento => {
        this.lancamento = lancamento;
        this.atualizarTituloEdicao();

    }).catch(erro => this.errorHandler.handle(erro))
  }

  salvar(lancamentoForm: NgForm) {
    if(this.editando){
        this.atualizarLancamento(lancamentoForm);
    } else {
        this.adicionarLancamento(lancamentoForm);
    }

  }

  adicionarLancamento(lancamentoForm: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
    .then((lancamentoAdicionado) => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' })

       // lancamentoForm.reset();
      //  this.lancamento = new Lancamento();
      this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo])
    }).catch(erro => this.errorHandler.handle(erro))
  }

  atualizarLancamento(lancamentoForm: NgForm) {
    this.lancamentoService.atualizar(this.lancamento)
    .then(lancamento => {
        this.lancamento = lancamento;

        this.messageService.add({ severity: 'success', detail: 'Lançamento alterado com sucesso!' })
    }).catch(erro => this.errorHandler.handle(erro));

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

  novo(lancamentoForm: NgForm) {
    lancamentoForm.reset()

    setTimeout(() => {
        this.lancamento = new Lancamento()
    }, 1)


    this.router.navigate(['/lancamentos/novo'])
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Ediçao de lançamento: ${this.lancamento.descricao}`)
  }


}
