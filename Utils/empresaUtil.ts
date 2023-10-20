import { Empresa } from "../model/empresa";
import { EmpresaDAO } from "../DAO/empresaDAO";


export function checarEmailEmpresa(empresas: EmpresaDAO, email: string): boolean{

    let listaEmpresas: Array<Empresa> =empresas.listarEmpresas()

    if(listaEmpresas.some(item => item.email === email)){
        return true
    }
    return false

}

export function checarSenhaEmpresa(empresas: EmpresaDAO, email:string, password: string): boolean{

    let listaEmpresas: Array<Empresa> =empresas.listarEmpresas()

    if(listaEmpresas.some(item => item.email === email && item.password === password)){
        return true
    }
    return false
    
}


