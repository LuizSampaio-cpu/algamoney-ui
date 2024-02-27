import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';
import { LogoutService } from 'src/app/seguranca/logout.service';
import { ErrorHandlerService } from '../error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

    exibindoMenu = false;
    usuarioLogado: string = '';

   // constructor() { }
    constructor(public auth: AuthService,
        private logoutService: LogoutService,
        private errorHandler: ErrorHandlerService,
        private router: Router) {}

    ngOnInit(): void {
       // this.usuarioLogado = this.auth.jwtPayload?.nome;
    }

    temPermissao(permissao: string) {
        return this.auth.temPermissao(permissao)
    }

    logout() {
        this.logoutService.logout()
        .then(() => {
            this.router.navigate(['/login'])
        })
        .catch(erro => this.errorHandler.handle(erro))

    }


}
