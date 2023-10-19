import { Candidato } from "../model/candidato";
import { CandidatoDAO } from "../DAO/candidatoDAO";
import { Empresa } from "../model/empresa";
import { EmpresaDAO } from "../DAO/empresaDAO";
import { LoginService } from "../service/loginService";
import ApexCharts from 'apexcharts'
import { Regex } from "../Utils/regex";
import { VagaDAO } from "../DAO/vagaDAO";
import { Vaga } from "../model/vaga";

let candidatos: CandidatoDAO = new CandidatoDAO
let empresas: EmpresaDAO = new EmpresaDAO
let vagas: VagaDAO = new VagaDAO

let campoEmailLogin = (<HTMLInputElement>document.getElementById('username'))
let campoSenhaLogin = (<HTMLInputElement>document.getElementById('password'))
let campoTipoLogin = (<HTMLInputElement>document.getElementById('opcao-login'))



//event listener para botao login
document.addEventListener("DOMContentLoaded", function (){

    const loginButton = document.getElementById('loginButton')
    loginButton?.addEventListener('click', function() {

        let email = campoEmailLogin.value
        let senha = campoSenhaLogin.value
        let tipoLogin = campoTipoLogin.value
    
        if(Regex.email.test(email) && senha){

            if(tipoLogin=='candidato'){

                if(LoginService.checarEmailCandidato(candidatos, email))
                {
                    if(LoginService.checarSenhaCandidato(candidatos, email, senha)){

                        window.location.href = 'pagina-candidato.html'
                        LoginService.updateUsuarioAtual(email, senha)

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

                if(LoginService.checarEmailEmpresa(empresas, email))
                {
                    if(LoginService.checarSenhaEmpresa(empresas, email, senha)){

                        window.location.href = 'pagina-empresa.html'
                        LoginService.updateUsuarioAtual(email, senha)

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
    
    })

})

let campoNomeCandidato = (<HTMLInputElement>document.getElementById('nome-candidato'))
let campoCpfCandidato = (<HTMLInputElement>document.getElementById('cpf-candidato'))
let campoIdadeCandidato = (<HTMLInputElement>document.getElementById('idade-candidato'))
let campoEmailCandidato = (<HTMLInputElement>document.getElementById('email-candidato'))
let campoSenhaCandidato = (<HTMLInputElement>document.getElementById('password-candidato'))
let campoEstadoCandidato = (<HTMLInputElement>document.getElementById('estado-candidato'))
let campoCepCandidato = (<HTMLInputElement>document.getElementById('cep-candidato'))
let campoDescricaoCandidato = (<HTMLInputElement>document.getElementById('descricao-candidato'))

let campoCompetenciaCandidato0 = (<HTMLInputElement>document.getElementById('0c'))
let campoCompetenciaCandidato1 = (<HTMLInputElement>document.getElementById('1c'))
let campoCompetenciaCandidato2 = (<HTMLInputElement>document.getElementById('2c'))
let campoCompetenciaCandidato3 = (<HTMLInputElement>document.getElementById('3c'))
let campoCompetenciaCandidato4 = (<HTMLInputElement>document.getElementById('4c'))
let campoCompetenciaCandidato5 = (<HTMLInputElement>document.getElementById('5c'))

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

//event listener para botao cadastro candidato
const cadastroCandidatoButton = document.getElementById('cadastroCandidatoButton')
cadastroCandidatoButton?.addEventListener('click', function() {

    let nome = campoNomeCandidato.value
    let cpf = campoCpfCandidato.value
    let idade = campoIdadeCandidato.value
    let email = campoEmailCandidato.value
    let senha = campoSenhaCandidato.value
    let estado = campoEstadoCandidato.value
    let cep = campoCepCandidato.value
    let descricao = campoDescricaoCandidato.value

    if(Regex.nome.test(nome) && Regex.cpf.test(cpf) && idade && Regex.email.test(email) && senha && estado && Regex.cep.test(cep) && descricao)
    {
        if(LoginService.checarEmailCandidato(candidatos, email)){

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
})


let campoNomeEmpresa = (<HTMLInputElement>document.getElementById('nome-empresa'))
let campoCnpjEmpresa = (<HTMLInputElement>document.getElementById('cnpj-empresa'))
let campoEmailEmpresa = (<HTMLInputElement>document.getElementById('email-empresa'))
let campoSenhaEmpresa = (<HTMLInputElement>document.getElementById('password-empresa'))
let campoPaisEmpresa = (<HTMLInputElement>document.getElementById('pais-empresa'))
let campoEstadoEmpresa = (<HTMLInputElement>document.getElementById('estado-empresa'))
let campoCepEmpresa = (<HTMLInputElement>document.getElementById('cep-empresa'))
let campoDescricaoEmpresa = (<HTMLInputElement>document.getElementById('descricao-empresa'))

let campoNomeVaga = (<HTMLInputElement>document.getElementById('nome-vaga'))
let campoIdVaga = (<HTMLInputElement>document.getElementById('id-vaga'))
let campoEstadoVaga = (<HTMLInputElement>document.getElementById('estado-vaga'))
let campoCidadeVaga = (<HTMLInputElement>document.getElementById('cidade-vaga'))
let campoDescricaoVaga = (<HTMLInputElement>document.getElementById('descricao-vaga'))

let campoCompetenciaVaga0 = (<HTMLInputElement>document.getElementById('0e'))
let campoCompetenciaVaga1 = (<HTMLInputElement>document.getElementById('1e'))
let campoCompetenciaVaga2 = (<HTMLInputElement>document.getElementById('2e'))
let campoCompetenciaVaga3 = (<HTMLInputElement>document.getElementById('3e'))
let campoCompetenciaVaga4 = (<HTMLInputElement>document.getElementById('4e'))
let campoCompetenciaVaga5 = (<HTMLInputElement>document.getElementById('5e'))

function limparCamposCadastroEmpresa() {

    campoNomeEmpresa.value = ''
    campoCnpjEmpresa.value = ''
    campoEmailEmpresa.value = ''
    campoSenhaEmpresa.value = ''
    campoPaisEmpresa.value = ''
    campoEstadoEmpresa.value = ''
    campoCepEmpresa.value = ''
    campoDescricaoEmpresa.value = ''

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

//event listener para botao cadastro empresa
const cadastroEmpresaButton = document.getElementById('cadastroEmpresaButton')
cadastroEmpresaButton?.addEventListener('click', function() {

    let nome = campoNomeEmpresa.value
    let cnpj = campoCnpjEmpresa.value
    let email = campoEmailEmpresa.value
    let senha = campoSenhaEmpresa.value
    let pais = campoPaisEmpresa.value
    let estado = campoEstadoEmpresa.value
    let cep = campoCepEmpresa.value
    let descricao = campoDescricaoEmpresa.value

    if(Regex.nome.test(nome) && Regex.cnpj.test(cnpj) && Regex.email.test(email) && senha && pais && estado && Regex.cep.test(cep) && descricao)
    {
        if(LoginService.checarEmailEmpresa(empresas, email)){

            alert('Email já cadastrado. Faça login.')
            limparCamposCadastroEmpresa()

        }
        else{

            let novaEmpresa: Empresa = new Empresa(nome, cnpj, email, senha, pais, estado, cep, descricao)
            
            empresas.cadastrarEmpresa(novaEmpresa)
            alert('Empresa cadastrada. Faça login.')
            limparCamposCadastroEmpresa()

        }
    }
    else{

        alert('Falha no cadastro. Certifique-se de que seus dados são válidos e tente novamente.')
        limparCamposCadastroEmpresa()

    }

})

//event listener para botao cadastro vaga
const cadastroVagaButton = document.getElementById('cadastroVagaButton')
cadastroVagaButton?.addEventListener('click', function() {

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

            let email = localStorage.getItem('usuarioAtual')!
            let novaVaga: Vaga = new Vaga(nome, id, cidade, estado, descricao, email)
            
            vagas.cadastrarVaga(novaVaga)

            alert('Vaga com ID ' + id + ' cadastrada.')
            limparCamposCadastroVaga()

        }
    }
    else{

        alert('Falha no cadastro. Certifique-se de que os dados são válidos e tente novamente.')
        limparCamposCadastroVaga()

    }

})

// ver vagas na pagina candidato
function updateVerVaga (vagaIndex: number){

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

let vagaIndex: number = 0
updateVerVaga(vagaIndex)

const proximaEmpresaButton = document.getElementById('next-vaga')
proximaEmpresaButton?.addEventListener('click', function() {
    
    vagaIndex++
    if(vagaIndex==vagas.size()){
        vagaIndex = 0
    }

    updateVerVaga(vagaIndex)
})


let campoSenhaExclusaoCandidato = (<HTMLInputElement>document.getElementById('senha-excluir'))
/* excluir conta candidato */
const excluirCandidatoButton = document.getElementById('excluirCandidato')
excluirCandidatoButton?.addEventListener('click', function() {

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

})

/* ver candidatos na pagina empresa */
function updateVerCandidato (candidatoIndex: number){

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

let candidatoIndex: number = 0
updateVerCandidato(candidatoIndex)

const proximoCandidatoButton = document.getElementById('next-candidato')
proximoCandidatoButton?.addEventListener('click', function() {
    
    candidatoIndex++
    if(candidatoIndex==candidatos.size()){
        candidatoIndex = 0
    }

    updateVerCandidato(candidatoIndex)
})

let campoIdExclusaoVaga = (<HTMLInputElement>document.getElementById('id-exclusao'))
/* deletar vaga */
const excluirVagaButton = document.getElementById('excluirVaga')
excluirVagaButton?.addEventListener('click', function() {

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
})

/* excluir conta empresa */
const excluirEmpresaButton = document.getElementById('excluirEmpresa')
excluirEmpresaButton?.addEventListener('click', function() {

    let password = (<HTMLInputElement>document.getElementById('senha-exclusao')).value
    if(password){

        if(password==localStorage.getItem('passwordUsuario')){

            empresas.excluirEmpresa(localStorage.getItem('usuarioAtual')!)
            window.location.href = 'index.html'
            alert('Sua conta foi excluída.')

        }
        else{

            alert('Senha incorreta. Tente novamente.')

        }

    }
    else{

        alert('Exclusão falhou. Tente novamente.')
        
    }

})

// add grafico de competencia

let competenciasDados: Array<number> = [0, 0, 0, 0, 0, 0]

for(let i=0; i<candidatos.size(); i++){
    let candidato: Candidato=candidatos.candidatos[i]
    for(let j=0; j<6; j++){
        if(candidato.competencias[j]==true){
            competenciasDados[j]++
        }
    }
}

var options = {
    color: ['#14342B'],
    series: [{
    data: [competenciasDados[0], competenciasDados[1], competenciasDados[2], competenciasDados[3], competenciasDados[4], competenciasDados[5]]
  }],
    chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['Assembly','Frontend' ,'Backend' ,'Fullstack' ,'DevOps' ,'Cloud Computing'
    ],
  }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();