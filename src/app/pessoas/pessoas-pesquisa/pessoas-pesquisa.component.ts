import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { PessoaFiltro, PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent{

    totalRegistros = 0;
    filtro = new PessoaFiltro();
    pessoas: any = [];
    @ViewChild('grid') grid: any;

    constructor(private pessoaService: PessoaService, private messageService: MessageService,
        private confirmation: ConfirmationService, private errorHandler: ErrorHandlerService){ }


    pesquisar(pagina: number = 0) {
        this.filtro.pagina = pagina;

        this.pessoaService.pesquisar(this.filtro).then((dados: any) => {
            this.pessoas = dados.pessoas;
            this.totalRegistros = dados.total;

        })

    }

    aoMudarPagina(event: LazyLoadEvent) {
        let pagina = 0;

        if (event.first && event.rows) {
            pagina = event.first / event.rows
        }
        this.pesquisar(pagina);
    }

    confirmarExclusao(pessoa: any) {
        this.confirmation.confirm({
            message: 'Tem certeza que deseja excluir?',
            accept: () => {
                this.excluir(pessoa)
            } });
      }

      excluir(pessoa: any) {
        this.pessoaService.excluir(pessoa.codigo)
        .then(() => {
            if (this.grid.first === 0) {
            this.pesquisar();
            } else {
            this.grid.reset();
            }

            this.messageService.add({ severity: 'success', detail: 'Pessoa excluída com sucesso!' })
        }).catch(erro => this.errorHandler.handle(erro));
    }

    alternarStatus(pessoa: any) {
        const novoStatus = !pessoa.ativo;

        this.pessoaService.mudarStatus(pessoa.codigo, novoStatus).then(() =>
        {
            const acao = novoStatus ? 'ativada' : 'desativada';

            pessoa.ativo = novoStatus;
            this.messageService.add({severity: 'success', detail: `Pessoa ${acao} com sucesso`});
        }).catch(erro => this.errorHandler.handle(erro));
    }

}
