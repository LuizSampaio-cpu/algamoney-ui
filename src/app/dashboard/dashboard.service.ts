import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

    lancamentosURL: string;

  constructor(private http: HttpClient) {
    this.lancamentosURL = `${environment.apiUrl}/lancamentos`
   }

   lancamentosPorCategoria(): Promise<Array<any>> {
        return this.http.get(`${this.lancamentosURL}/estatisticas/por-categoria`)
        .toPromise()
        .then((response: any) => response);
   }

   lancamentosPorDia(): Promise<Array<any>> {
    return this.http.get(`${this.lancamentosURL}/estatisticas/por-dia`)
    .toPromise()
    .then((response: any) =>{
        const dados = response;
        this.converterStringsParaDatas(dados);

        return dados
    });

   }
   private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      let offset = new Date().getTimezoneOffset() * 60000;

      dado.dia = new Date(dado.dia);
      dado.dia = new Date(new Date(dado.dia).getTime() + offset);
    }
  }

}
