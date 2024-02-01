import { Component, Input, OnInit } from '@angular/core';
import { PessoaFiltro } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

    @Input() pessoas: any[] = [];
    @Input() totalRegistros = 0;
    @Input() filtro = new PessoaFiltro();

}
