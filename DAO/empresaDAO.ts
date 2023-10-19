import { Empresa } from "../model/empresa";

export class EmpresaDAO{

    empresas: Array<Empresa>

    constructor(){
        this.empresas=new Array<Empresa>
        if(localStorage.hasOwnProperty("empresas")){
            this.empresas = JSON.parse(localStorage.getItem("empresas")!)
        }
    }

    public cadastrarEmpresa(empresa: Empresa){
        this.empresas.push(empresa)
        this.updateLocalStorage()
    }

    public excluirEmpresa(email: string){
        let empresa: Empresa = this.empresas.find(item => item.email == email)!
        let index=this.empresas.indexOf(empresa);
        this.empresas.splice(index, 1);
        this.updateLocalStorage()
    }

    public limparEmpresas(){
        this.empresas.length=0
    }

    public listarEmpresas(): Array<Empresa>{
        return this.empresas 
    }

    public size(): number{
        return this.empresas.length
    }

    public updateLocalStorage(): void{
        localStorage.setItem("empresas", JSON.stringify(this.empresas))
    }
}