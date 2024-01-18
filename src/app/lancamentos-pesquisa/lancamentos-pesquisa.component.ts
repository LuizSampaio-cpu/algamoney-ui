import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {
    lancamentos = [
        { tipo: 'DESPESA', pessoa: 'Padaria do José', descricao: 'Compra de pão', dataVencimento: new Date(2017, 5, 30),
          dataPagamento: null, valor: 4.55 },
        { tipo: 'RECEITA', pessoa: 'Atacado Brasil' , descricao: 'Venda de software', dataVencimento: new Date(2017, 6, 10),
          dataPagamento: new Date(2017, 6, 9), valor: 80000},
        { tipo: 'DESPESA', pessoa: 'Ministério da Fazenda', descricao: 'Impostos', dataVencimento: new Date(2017, 7, 20),
          dataPagamento: null, valor: 14312 },
        { tipo: 'DESPESA', pessoa: 'Escola Abelha Rainha', descricao: 'Mensalidade de escola', dataVencimento: new Date(2017, 6, 5),
          dataPagamento: new Date(2017, 5, 30), valor: 800 },
        { tipo: 'RECEITA', pessoa: 'Sebastião Souza', descricao: 'Venda de carro', dataVencimento: new Date(2017, 8, 18),
          dataPagamento: null, valor: 55000 },
        { tipo: 'DESPESA', pessoa: 'Casa Nova Imóveis', descricao: 'Aluguel', dataVencimento: new Date(2017, 7, 10),
          dataPagamento: new Date(2017, 7, 9), valor: 1750 },
        { tipo: 'DESPESA', pessoa: 'Academia Top', descricao: 'Mensalidade musculação', dataVencimento: new Date(2017, 7, 13),
          dataPagamento: null, valor: 180 }
      ];


}
