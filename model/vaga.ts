export class Vaga{
    
    competencias: Array<boolean>

    constructor(public nome: string, public id: string, public estado: string, public cidade: string, public descricao: string, public emailEmpresa: string){

        this.nome = nome
        this.id = id
        this.estado = estado
        this.cidade = cidade
        this.descricao = descricao
        this.emailEmpresa = emailEmpresa
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