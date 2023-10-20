import { VagaDAO } from "../DAO/vagaDAO"
import { Vaga } from "../model/vaga"
import { campoIdExclusaoVaga, campoNomeVaga, campoIdVaga, campoEstadoVaga, campoCidadeVaga, campoDescricaoVaga } from "../Utils/acessoHtml"
import { campoCompetenciaVaga0, campoCompetenciaVaga1, campoCompetenciaVaga2, campoCompetenciaVaga3, campoCompetenciaVaga4, campoCompetenciaVaga5 } from "../Utils/acessoHtml"


export function botaoCadastroVaga(vagas: VagaDAO) {

    let nome = campoNomeVaga.value
    let id = campoIdVaga.value
    let estado = campoEstadoVaga.value
    let cidade = campoCidadeVaga.value
    let descricao = campoDescricaoVaga.value

    if(nome && id && estado && cidade && descricao)
    {
        if(vagas.checarVaga(id)){

            alert('ID já cadastrado.')
            limparCamposCadastroVaga()

        }
        else{

            let competencias: Array<boolean> = new Array<boolean>
            competencias[0] = campoCompetenciaVaga0.checked
            competencias[1] = campoCompetenciaVaga1.checked
            competencias[2] = campoCompetenciaVaga2.checked
            competencias[3] = campoCompetenciaVaga3.checked
            competencias[4] = campoCompetenciaVaga4.checked
            competencias[5] = campoCompetenciaVaga5.checked

            let email = localStorage.getItem('usuarioAtual')!
            let novaVaga: Vaga = new Vaga(nome, id, cidade, estado, descricao, email)
            
            for(let i=0; i<6; i++){
                if(competencias[i]){
                    novaVaga.addCompetencia(i)
                }            
            }

            vagas.cadastrarVaga(novaVaga)

            alert('Vaga com ID ' + id + ' cadastrada.')
            limparCamposCadastroVaga()

        }
    }
    else{

        alert('Falha no cadastro. Certifique-se de que os dados são válidos e tente novamente.')
        limparCamposCadastroVaga()

    }

}

function limparCamposCadastroVaga() {

    campoNomeVaga.value = ''
    campoIdVaga.value = ''
    campoEstadoVaga.value = ''
    campoCidadeVaga.value = ''
    campoDescricaoVaga.value = ''

    campoCompetenciaVaga0.checked = false
    campoCompetenciaVaga1.checked = false
    campoCompetenciaVaga2.checked = false
    campoCompetenciaVaga3.checked = false
    campoCompetenciaVaga4.checked = false
    campoCompetenciaVaga5.checked = false

}

let vagaIndex: number = 0
export function updateVerVaga (vagas: VagaDAO){

    const abaVerVaga = document.getElementById('ver-vagas')

    let listaVagas: Array<Vaga> = vagas.listarVagas()
    let verVaga: Vaga = listaVagas[vagaIndex]
    
    let detalhes: string = ''

    detalhes += ' </br> </br> <p>Descrição da vaga: ' + verVaga.descricao + '</p> </br>'
    detalhes += '<p>Localização da vaga: </p> </br>'
    detalhes += '<p>Estado: ' + verVaga.estado + '</p> </br>'
    detalhes += '<p>Cidade: ' + verVaga.cidade + '</p> </br>'

    let verCompetencias: Array<boolean> = verVaga.competencias

    detalhes += '<p>Competências desejadas para preenchimento da vaga: </p> </br>'
    if(verCompetencias[0]) detalhes += '<p>' + 'Assembly' + '</p> </br>'
    if(verCompetencias[1]) detalhes += '<p>' + 'Frontend' + '</p> </br>'
    if(verCompetencias[2]) detalhes += '<p>' + 'Backend' + '</p> </br>'
    if(verCompetencias[3]) detalhes += '<p>' + 'Fullstack' + '</p> </br>'
    if(verCompetencias[4]) detalhes += '<p>' + 'DevOps' + '</p> </br>'
    if(verCompetencias[5]) detalhes += '<p>' + 'Cloud Computing' + '</p> </br>'

    if(abaVerVaga) abaVerVaga!.innerHTML = detalhes

}

export function botaoProximaVaga(vagas: VagaDAO) {

    vagaIndex++
    if(vagaIndex==vagas.size()){
        vagaIndex = 0
    }

    updateVerVaga(vagas)

}

export function botaoExcluirVaga(vagas: VagaDAO){

    let id = campoIdExclusaoVaga.value
    if(id){

        if(vagas.checarVaga(id)){

            let vaga: Vaga = vagas.findVaga(id)
            if(vaga.emailEmpresa == localStorage.getItem('usuarioAtual')){

                vagas.excluirVaga(id)
                alert('Vaga ' + id + ' excluída com sucesso.')
                campoIdExclusaoVaga.value = ''

            }else{

                alert('Exclusão falhou. Tente novamente.')
                campoIdExclusaoVaga.value = ''

            }

        }else{

            alert('ID não existe. Tente novamente.')
            campoIdExclusaoVaga.value = ''

        }

    }else{

        alert('Exclusão falhou. Tente novamente.')
        campoIdExclusaoVaga.value = ''

    }

}