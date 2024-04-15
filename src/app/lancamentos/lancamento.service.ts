import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lancamento } from '../core/model';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  lancamentosUrl: string;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`
  }

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

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      //.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      //.append('Content-Type', 'application/json');

    return firstValueFrom(this.http.post<Lancamento>(this.lancamentosUrl, lancamento, { headers }));
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders();
      //.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      //.append('Content-Type', 'application/json');

      return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento, { headers })
      .toPromise()
      .then((response: any) => {
        this.converterStringsParaDatas([response]);

        return response;
      });

  }

  buscaPorCodigo(codigo: number): Promise<any> {
    const headers = new HttpHeaders();

    return this.http.get(`${this.lancamentosUrl}/${codigo}`, {headers}).toPromise().then((response: any) => {
        this.converterStringsParaDatas([response]);

        return response;
    });

  }

 converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
        let offset = new Date().getTimezoneOffset() * 60000;
        lancamento.dataVencimento = new Date (new Date(lancamento.dataVencimento!).getTime() + offset)

        if(lancamento.dataPagamento) {
            lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento).getTime() + offset)
        }
    }
  }

  uploadHeaders(){
    return new HttpHeaders().append('Auhorization', 'Bearer'+ localStorage.getItem('token'))
  }

  urlUploadAnexo(): string {
    return `${this.lancamentosUrl}/anexo`
  }

}
