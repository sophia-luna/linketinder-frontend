import { Candidato } from "../candidato/candidato";
import { CandidatoDAO } from "../candidato/candidatoDAO";
import { Empresa } from "../empresa/empresa";
import { EmpresaDAO } from "../empresa/empresaDAO";

export class LoginService{

    public static checarEmailCandidato(candidatos: CandidatoDAO, email: string): boolean{
        let listaCandidatos: Array<Candidato> =candidatos.listaCandidatos()
        if(listaCandidatos.some(item => item.email === email)){
            return true
        }
        return false
    }

    public static checarEmailEmpresa(empresas: EmpresaDAO, email: string): boolean{
        let listaEmpresas: Array<Empresa> =empresas.listarEmpresas()
        if(listaEmpresas.some(item => item.email === email)){
            return true
        }
        return false
    }

    public static checarSenhaCandidato(candidatos: CandidatoDAO, email:string, password: string): boolean{
        let listaCandidatos: Array<Candidato> =candidatos.listaCandidatos()
        if(listaCandidatos.some(item => item.email === email && item.password === password)){
            return true
        }
        return false
    }

    public static checarSenhaEmpresa(empresas: EmpresaDAO, email:string, password: string): boolean{
        let listaEmpresas: Array<Empresa> =empresas.listarEmpresas()
        if(listaEmpresas.some(item => item.email === email && item.password === password)){
            return true
        }
        return false
    }

    public static updateUsuarioAtual(email: string, password: string): void{
        localStorage.setItem("usuarioAtual", email)
        localStorage.setItem("passwordUsuario", password)
    }
    
}