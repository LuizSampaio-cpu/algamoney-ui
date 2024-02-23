import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../core/model';
import { firstValueFrom } from 'rxjs';

export class PessoaFiltro {
    nome?: string;
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

  mudarStatus(codigo: number, ativo: boolean): Promise<any> {
    const headers = new HttpHeaders()

    return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, ativo, {headers}).toPromise();

  }
  adicionar(pessoa: Pessoa): Promise<Pessoa>{

        const headers = new HttpHeaders()
          //.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
          //.append('Content-Type', 'application/json');

        return firstValueFrom(this.http.post<Pessoa>(this.pessoasUrl, pessoa, { headers }));
  }
  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()


    return firstValueFrom(this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa, { headers }))

  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    const headers = new HttpHeaders()


      return firstValueFrom(this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`, { headers }))
  }


 }
