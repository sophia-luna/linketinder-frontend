import { Pessoa } from "./pessoa";

export class Empresa extends Pessoa{

    constructor(nome: string, public cnpj: string, email: string, password: string, public pais: string, estado: string, cep: string, public descricao: string){
        super(nome, email, password, estado, cep)
        this.cnpj = cnpj
        this.pais = pais
        this.descricao = descricao
    }

}