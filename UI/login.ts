import { CandidatoDAO } from "../DAO/candidatoDAO"
import { EmpresaDAO } from "../DAO/empresaDAO"
import { campoEmailLogin, campoSenhaLogin, campoTipoLogin } from "../Utils/acessoHtml"
import { emailRegex } from "../Utils/regex"
import { checarEmailCandidato, checarSenhaCandidato } from "../Utils/candidatoUtil"
import { checarEmailEmpresa, checarSenhaEmpresa } from "../Utils/empresaUtil"


export function updateUsuarioAtual(email: string, password: string): void{
    localStorage.setItem("usuarioAtual", email)
    localStorage.setItem("passwordUsuario", password)
}
    
export function botaoLogin(candidatos: CandidatoDAO, empresas: EmpresaDAO){

    let email = campoEmailLogin.value
    let senha = campoSenhaLogin.value
    let tipoLogin = campoTipoLogin.value
    
    if(emailRegex.test(email) && senha){

        if(tipoLogin=='candidato'){

            if(checarEmailCandidato(candidatos, email))
            {
                if(checarSenhaCandidato(candidatos, email, senha)){

                    window.location.href = 'pagina-candidato.html'
                    updateUsuarioAtual(email, senha)

                    campoEmailLogin.value = ''
                    campoSenhaLogin.value = ''

                }
                else{

                    alert('Senha incorreta. Tente novamente.')
                    campoSenhaLogin.value = ''

                }
            }
            else{

                alert('Email não cadastrado. Cadastre-se clicando em "Cadastre-se como Candidato" para fazer login.')
                campoEmailLogin.value = ''
                campoSenhaLogin.value = ''

            }

        }
        else {

            if(checarEmailEmpresa(empresas, email))
            {
                if(checarSenhaEmpresa(empresas, email, senha)){

                    window.location.href = 'pagina-empresa.html'
                    updateUsuarioAtual(email, senha)

                    campoEmailLogin.value = ''
                    campoSenhaLogin.value = ''

                }
                else{
                       
                    alert('Senha incorreta. Tente novamente.')
                    campoSenhaLogin.value = ''

                }
            }
            else{

                alert('Email não cadastrado. Cadastre-se clicando em "Cadastre-se como Empresa" para fazer login.')
                campoEmailLogin.value = ''
                campoSenhaLogin.value = ''

            }

        }

    }
    else{

        alert('Falha no login. Tente novamente.')
        campoEmailLogin.value = ''
        campoSenhaLogin.value = ''

    }

}
