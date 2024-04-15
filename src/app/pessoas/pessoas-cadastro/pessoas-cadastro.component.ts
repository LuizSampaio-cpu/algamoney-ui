import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { FormControl, NgForm } from '@angular/forms';
import { Contato, Pessoa } from 'src/app/core/model';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {




  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit(): void {
    const codigoPessoa = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova pessoa')

    if(codigoPessoa && codigoPessoa !== 'nova'){
        this.carregarPessoa(codigoPessoa)
    }
  }

  get editando() {
    return Boolean(this.pessoa.codigo)
  }


  salvar(form: NgForm) {
    if(this.editando)
        this.atualizarPessoa(form);
    else {
        this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
        .then((pessoaAdicionada: Pessoa) => {
            this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });

            this.router.navigate(['pessoas', pessoaAdicionada.codigo])
        }).catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: NgForm) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.messageService.add({ severity: 'success', detail: 'Pessoa alterada com sucesso!' });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoa(codigo: number) {
     this.pessoaService.buscarPorCodigo(codigo).then((pessoa: Pessoa) =>
     {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao()

     }).catch(erro => this.errorHandler.handle(erro));
    }


  nova(form: NgForm) {
    form.reset();

    setTimeout(() => {
        this.pessoa = new Pessoa();
    }, 1);

    this.router.navigate(['pessoas', 'nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }


}
