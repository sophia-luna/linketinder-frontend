import { Candidato } from "./candidato";

export class CandidatoDAO{

    candidatos: Array<Candidato>

    constructor(){
        this.candidatos=new Array<Candidato>
        if(localStorage.hasOwnProperty("candidatos")){
            this.candidatos = JSON.parse(localStorage.getItem("candidatos")!)
        }
    }

    public cadastrarCandidato(candidato: Candidato){
        this.candidatos.push(candidato)
        this.updateLocalStorage()
    }

    public excluirCandidato(email: string){
        let candidato: Candidato = this.candidatos.find(item => item.email == email)!
        let index=this.candidatos.indexOf(candidato);
        this.candidatos.splice(index, 1);
        this.updateLocalStorage()
    }

    public limparCandidatos(){
        this.candidatos.length=0
    }

    public listaCandidatos(): Array<Candidato> {
        return this.candidatos
    }

    public size(): number{
        return this.candidatos.length
    }

    public updateLocalStorage(): void{
        localStorage.setItem("candidatos", JSON.stringify(this.candidatos))
    }
}
