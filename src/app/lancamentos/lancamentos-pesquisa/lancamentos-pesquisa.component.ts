import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Injector } from '@angular/core';

import { LancamentoFiltro, LancamentoService } from './../lancamento.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro()
  lancamentos: any[] = [];
 // injector!: Injector;
  @ViewChild('grid') grid: any;

  constructor(
    private auth: AuthService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de lançamentos')
    //const authService = this.injector.get(AuthService)
  }


  pesquisar(pagina = 0): void {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;
    this.pesquisar(pagina);

  }

  confirmarExclusao(lancamento:any) {
    this.confirmation.confirm({
        message: 'Tem certeza que deseja excluir?',
        accept: () => {
            this.excluir(lancamento)
        } });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
    .then(() => {
        if (this.grid.first === 0) {
        this.pesquisar();
        } else {
        this.grid.reset();
        }

        this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!' })
    })
  }

  naoTemPermissao(permissao: string) {
    //return !this.auth.temPermissao(permissao);
    console.log(permissao);
  }

}
