import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'algamoney-ui';

  constructor(
    private config: PrimeNGConfig,
    private router: Router
  ) { }

  ngOnInit() {

  }

  exibindoNavbar() {
    return this.router.url !== '/login';
  }

}
