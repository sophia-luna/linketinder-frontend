import { Pessoa } from "./pessoa"
export class Candidato extends Pessoa {

    competencias: Array<boolean>

    constructor(nome: string, public cpf: string, public idade: string, email: string, password: string, estado: string, cep: string, public descricao: string){
        super(nome, email, password, estado, cep)
        this.cpf = cpf 
        this.idade = idade 
        this.descricao = descricao
        this.competencias = new Array<boolean>
        for(let i=0; i<6; i++)
        {
            this.competencias[i] = false
        }
    }

    public addCompetencia(competencia: number){
        this.competencias[competencia] = true
    }

    public getCompetencias(): Array<boolean>{
        return this.competencias
    }

}