import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PessoaFiltro, PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent{

    totalRegistros = 0;
    filtro = new PessoaFiltro();
    pessoas: any = [];

    constructor(private pessoaService: PessoaService){ }


    pesquisar(pagina: number = 0) {
        this.filtro.pagina = pagina;

        this.pessoaService.pesquisar(this.filtro).then((dados: any) => {
            this.pessoas = dados.pessoas;
            this.totalRegistros = dados.total;
        });
    }

    aoMudarPagina(event: LazyLoadEvent) {
        let pagina = 0;

        if (event.first && event.rows) {
            pagina = event.first / event.rows
        }
        this.pesquisar(pagina);
    }

}
