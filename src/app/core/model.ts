export class Endereco {
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cep?: string;
    cidade?: string;
    estado?: string;
}


export class Pessoa {
    codigo?: number;
    nome?: string;
    endereco = new Endereco();
    ativo = true;

}

export class Categoria {
    codigo: number = 0;
}

export class Lancamento {
    codigo: number = 0;
    tipo = 'RECEITA';
    descricao: string = '';
    dataVencimento?: Date;
    dataPagamento?: Date;
    valor: number = 0;
    observacao: string = '';
    pessoa = new Pessoa();
    categoria = new Categoria();

}
