import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PessoaFiltro {
    nome: string = '';
    pagina: number = 0;
    itensPorPagina: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {

    const headers = new HttpHeaders();

    let params = new HttpParams();

    params.set('page', filtro.pagina);
    params.set('size', filtro.itensPorPagina);


    if(filtro.nome){
        params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}?page=${filtro.pagina}&size=${filtro.itensPorPagina}`, {headers, params})
    .toPromise().then((response: any) => {
        const pessoas = response['content'];

        const resultado = {
            pessoas,
            total: response['totalElements']
        };
        return resultado;
    });
  }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders();


    return this.http.get(this.pessoasUrl, {headers}).toPromise().then((response: any) => response['content']);
  }

  excluir(codigo: number): Promise<any> {
    const headers = new HttpHeaders();


    return this.http.delete(`${this.pessoasUrl}/${codigo}`, {headers}).toPromise().then(() => null);

  }
}
