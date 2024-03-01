import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, FormBuilder, Validators} from '@angular/forms';
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

    //lancamento = new Lancamento();

    formulario!: FormGroup;

  constructor(
    private categoriaService: CategoriasService,
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuild: FormBuilder) { }

  ngOnInit(): void {
    this.configurarFormulario()

    const codigoLancamento = this.route.snapshot.params['codigo'];

    if(codigoLancamento && codigoLancamento !== 'novo'){
        this.carregarLancamento(codigoLancamento);
    }
    this.carregarCategorias();
    this.carregarPessoas();

    this.title.setTitle('Cadastro de lancamentos')
  }

  configurarFormulario() {
    this.formulario = this.formBuild.group({
        codigo: [null],
        tipo: ['RECEITA ', Validators.required],
        dataVencimento: [null, Validators.required],
        dataPagamento: [null],
        descricao: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
        valor: [null, Validators.required],
        pessoa: this.formBuild.group({
            codigo: [null, Validators.required],
            nome: []
        }),
        categoria: this.formBuild.group({
            codigo: [null, Validators.required],
            nome: []
        }),
        observacao: []

    })
  }

  validarObrigatoriedade(input: FormControl) {

    return (input.value ? null : {obrigatoriedade: true})
  }

  validarTamanhoMinimo(valor: number) {
    return(input: FormControl) => {
        return (!input.value || input.value.length >= valor) ? null : {tamanhoMinimo: {tamanho: valor}}
    }
  }

  get editando() {
    return Boolean(this.formulario.get('codigo')?.value)
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscaPorCodigo(codigo).then(lancamento => {
        //this.lancamento = lancamento;
        this.formulario.patchValue(lancamento)
        this.atualizarTituloEdicao();

    }).catch(erro => this.errorHandler.handle(erro))
  }

  salvar() {
    if(this.editando){
        this.atualizarLancamento();
    } else {
        this.adicionarLancamento();
    }

  }

  adicionarLancamento() {
    this.lancamentoService.adicionar(this.formulario.value)
    .then((lancamentoAdicionado) => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' })

       // lancamentoForm.reset();
      //  this.lancamento = new Lancamento();
      this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo])
    }).catch(erro => this.errorHandler.handle(erro))
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
    .then(lancamento => {
        //this.lancamento = lancamento;
        this.formulario.setValue(lancamento)

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

  novo() {
    this.formulario.reset();
    this.formulario.patchValue(new Lancamento())
    this.router.navigate(['lancamentos/novo']);
  }



  atualizarTituloEdicao() {
    this.title.setTitle(`Ediçao de lançamento: ${this.formulario.get('descricao')?.value}`)
  }


}
