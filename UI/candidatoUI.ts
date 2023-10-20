import { CandidatoDAO } from "../DAO/candidatoDAO"
import { Candidato } from "../model/candidato"
import { campoSenhaExclusaoCandidato, campoNomeCandidato, campoCpfCandidato, campoIdadeCandidato, campoEmailCandidato, campoSenhaCandidato, campoEstadoCandidato, campoCepCandidato, campoDescricaoCandidato } from "../Utils/acessoHtml"
import { campoCompetenciaCandidato0, campoCompetenciaCandidato1, campoCompetenciaCandidato2, campoCompetenciaCandidato3, campoCompetenciaCandidato4, campoCompetenciaCandidato5 } from "../Utils/acessoHtml"
import { checarEmailCandidato } from "../Utils/candidatoUtil"
import { nomeRegex, cpfRegex, emailRegex, cepRegex } from "../Utils/regex"


export function botaoCadastroCandidato(candidatos: CandidatoDAO) {

    let nome = campoNomeCandidato.value
    let cpf = campoCpfCandidato.value
    let idade = campoIdadeCandidato.value
    let email = campoEmailCandidato.value
    let senha = campoSenhaCandidato.value
    let estado = campoEstadoCandidato.value
    let cep = campoCepCandidato.value
    let descricao = campoDescricaoCandidato.value

    if(nomeRegex.test(nome) && cpfRegex.test(cpf) && idade && emailRegex.test(email) && senha && estado && cepRegex.test(cep) && descricao)
    {
        if(checarEmailCandidato(candidatos, email)){

            alert('Email já cadastrado. Faça login.')
            limparCamposCadastroCandidato()

        }
        else{

            let competencias: Array<boolean> = new Array<boolean>
            competencias[0] = campoCompetenciaCandidato0.checked
            competencias[1] = campoCompetenciaCandidato1.checked
            competencias[2] = campoCompetenciaCandidato2.checked
            competencias[3] = campoCompetenciaCandidato3.checked
            competencias[4] = campoCompetenciaCandidato4.checked
            competencias[5] = campoCompetenciaCandidato5.checked

            let novoCandidato: Candidato = new Candidato(nome, cpf, idade, email, senha, estado, cep, descricao)
            for(let i=0; i<6; i++){
                if(competencias[i]){
                    novoCandidato.addCompetencia(i)
                }            
            }

            candidatos.cadastrarCandidato(novoCandidato)
            alert('Candidato cadastrado. Faça login.')
            limparCamposCadastroCandidato()

        }
    }
    else{

        alert('Falha no cadastro. Certifique-se de que seus dados são válidos e tente novamente.')
        limparCamposCadastroCandidato()

    }

}

function limparCamposCadastroCandidato() {

    campoNomeCandidato.value = ''
    campoCpfCandidato.value = ''
    campoIdadeCandidato.value = ''
    campoEmailCandidato.value = ''
    campoSenhaCandidato.value = ''
    campoEstadoCandidato.value = ''
    campoCepCandidato.value = ''
    campoDescricaoCandidato.value = ''
    campoCompetenciaCandidato0.checked = false
    campoCompetenciaCandidato1.checked = false
    campoCompetenciaCandidato2.checked = false
    campoCompetenciaCandidato3.checked = false
    campoCompetenciaCandidato4.checked = false
    campoCompetenciaCandidato5.checked = false

}

export function botaoExcluirCandidato(candidatos: CandidatoDAO) {

    let password = campoSenhaExclusaoCandidato.value
    if(password){

        if(password==localStorage.getItem('passwordUsuario')){

            candidatos.excluirCandidato(localStorage.getItem('usuarioAtual')!)
            window.location.href = 'index.html'
            alert('Sua conta foi excluída.')

        }
        else{

            alert('Senha incorreta. Tente novamente.')
            campoSenhaExclusaoCandidato.value = ''

        }

    }
    else{

        alert('Exclusão falhou. Tente novamente.')
        campoSenhaExclusaoCandidato.value = ''

    }

}

let candidatoIndex: number = 0
export function updateVerCandidato (candidatos: CandidatoDAO){

    const abaVerCandidato = document.getElementById('ver-candidatos')

    let listaCandidatos: Array<Candidato> = candidatos.listaCandidatos()
    let verCandidato: Candidato = listaCandidatos[candidatoIndex]
    
    let detalhes: string = ''

    detalhes += ' </br> </br> <p>Descrição do candidato: ' + verCandidato.descricao + '</p> </br>'
    detalhes += '<p>Idade do candidato: ' + verCandidato.idade + '</p> </br>'
    detalhes += '<p>Localização do candidato: </p> </br>'
    detalhes += '<p>Estado: ' + verCandidato.estado + '</p> </br>'
    detalhes += '<p>CEP: ' + verCandidato.cep + '</p> </br>'

    let verCompetencias: Array<boolean> = verCandidato.competencias
    
    detalhes += '<p>Competências do candidato: </p> </br>'
    if(verCompetencias[0]) detalhes += '<p>' + 'Assembly' + '</p> </br>'
    if(verCompetencias[1]) detalhes += '<p>' + 'Frontend' + '</p> </br>'
    if(verCompetencias[2]) detalhes += '<p>' + 'Backend' + '</p> </br>'
    if(verCompetencias[3]) detalhes += '<p>' + 'Fullstack' + '</p> </br>'
    if(verCompetencias[4]) detalhes += '<p>' + 'DevOps' + '</p> </br>'
    if(verCompetencias[5]) detalhes += '<p>' + 'Cloud Computing' + '</p> </br>'

    if(abaVerCandidato) abaVerCandidato!.innerHTML = detalhes

}

export function botaoProximoCandidato(candidatos: CandidatoDAO){

    candidatoIndex++
    if(candidatoIndex==candidatos.size()){
        candidatoIndex = 0
    }

    updateVerCandidato(candidatos)

}