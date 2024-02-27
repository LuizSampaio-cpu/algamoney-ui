import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

    categoriasUrl: string;

  constructor(private httpClient: HttpClient) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`
   }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders();

    return this.httpClient.get(this.categoriasUrl, {headers}).toPromise();
  }
}
