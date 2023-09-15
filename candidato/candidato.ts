import { Pessoa } from "../pessoa/pessoa"
export class Candidato extends Pessoa {

    constructor(nome: string, public cpf: string, public idade: string, email: string, password: string, estado: string, cep: string, public descricao: string){
        super(nome, email, password, estado, cep)
        this.cpf=cpf 
        this.idade=idade 
        this.descricao=descricao 
    }
}