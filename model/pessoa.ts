export class Pessoa{
    
    constructor(public nome: string, public email: string, public password: string, public estado: string, public cep: string){
        this.password = password
        this.nome = nome
        this.email = email
        this.estado = estado
        this.cep = cep
    }

}