import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

    exibindoMenu = false;
    usuarioLogado: string = '';

   // constructor() { }
    constructor(public auth: AuthService) {}

    ngOnInit(): void {
       // this.usuarioLogado = this.auth.jwtPayload?.nome;
    }

    temPermissao(permissao: string) {
        return this.auth.temPermissao(permissao)
    }


}
