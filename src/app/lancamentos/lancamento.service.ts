import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class LancamentoFiltro {
  descricao?: string
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina: number  = 0;
  itensPorPagina: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new HttpHeaders()


    let params = new HttpParams();

    params.set('page', filtro.pagina)
    params.set('size', filtro.itensPorPagina)


    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'dd/MM/y')!);
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'dd/MM/y')!);
    }

    return this.http.get(`${this.lancamentosUrl}?resumo&page=${filtro.pagina}&size=${filtro.itensPorPagina}`, { headers, params })
      .toPromise()
      .then((response: any) => {
        const lancamentos = response['content'];

        const resultado = {
          lancamentos,
          total: response['totalElements']
        };

        return resultado;
      });
  }

  excluir(codigo: number): Promise<any> {
    const headers = new HttpHeaders();


    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, {headers}).toPromise().then(() => null);

  }

}
