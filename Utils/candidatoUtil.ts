import { Candidato } from "../model/candidato";
import { CandidatoDAO } from "../DAO/candidatoDAO";


export function checarEmailCandidato(candidatos: CandidatoDAO, email: string): boolean{

    let listaCandidatos: Array<Candidato> = candidatos.listaCandidatos()

    if(listaCandidatos.some(item => item.email === email)){
        return true
    }
    return false

}

export function checarSenhaCandidato(candidatos: CandidatoDAO, email:string, password: string): boolean{

    let listaCandidatos: Array<Candidato> =candidatos.listaCandidatos()

    if(listaCandidatos.some(item => item.email === email && item.password === password)){
         return true
    }
    return false

}
