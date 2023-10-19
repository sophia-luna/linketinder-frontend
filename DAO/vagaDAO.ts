import { Vaga } from "../model/vaga";

export class VagaDAO{

    vagas: Array<Vaga>

    constructor(){
        this.vagas = new Array<Vaga>
        if(localStorage.hasOwnProperty("vagas")){
            this.vagas = JSON.parse(localStorage.getItem("vagas")!)
        }
    }

    public cadastrarVaga(vaga: Vaga){
        this.vagas.push(vaga)
        this.updateLocalStorage()
    }

    public excluirVaga(id: string){
        let vaga: Vaga = this.vagas.find(item => item.id == id)!
        let index=this.vagas.indexOf(vaga);
        this.vagas.splice(index, 1);
        this.updateLocalStorage()
    }

    public checarVaga(id: string): boolean{
        if(this.vagas.some(item => item.id === id)){
            return true
        }
        return false
    }

    public findVaga(id: string): Vaga{
        return this.vagas.find(item => item.id == id)!
    }

    public limparVagas(){
        this.vagas.length=0
    }

    public listarVagas(): Array<Vaga>{
        return this.vagas 
    }

    public size(): number{
        return this.vagas.length
    }

    public updateLocalStorage(): void{
        localStorage.setItem("vagas", JSON.stringify(this.vagas))
    }
}