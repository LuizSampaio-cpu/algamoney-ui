import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

    categoriasUrl='http://localhost:8080/categorias';

  constructor(private httpClient: HttpClient) { }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders();

    return this.httpClient.get(this.categoriasUrl, {headers}).toPromise();
  }
}
