export class Pessoa{
    
    competencias: Array<boolean>

    constructor(public nome: string, public email: string, public password: string, public estado: string, public cep: string){
        this.password=password
        this.nome=nome
        this.email=email
        this.estado=estado
        this.cep=cep
        this.competencias=new Array<boolean>
        for(let i=0; i<6; i++)
        {
            this.competencias[i]=false
        }
    }

    public addCompetencia(competencia: number){
        this.competencias[competencia]=true
    }

    public getCompetencias(): Array<boolean>{
        return this.competencias
    }
}