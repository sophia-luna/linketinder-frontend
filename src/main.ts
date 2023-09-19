import { Candidato } from "../candidato/candidato";
import { CandidatoDAO } from "../candidato/candidatoDAO";
import { Empresa } from "../empresa/empresa";
import { EmpresaDAO } from "../empresa/empresaDAO";
import { LoginService } from "../login/loginService";
import ApexCharts from 'apexcharts'

let candidatos: CandidatoDAO = new CandidatoDAO
let empresas: EmpresaDAO = new EmpresaDAO

const nomeRegex: RegExp = /\b[a-zA-Zà-úÀ-Ú-\s]+\b/
const emailRegex: RegExp = /\S+@\w+\.\w{2,6}(\.\w{2})?/gi
const cpfRegex: RegExp = /\b[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}\b/
const cnpjRegex: RegExp = /\b[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}\b/
const telefoneRegex: RegExp = /\b(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))\b/
const cepRegex: RegExp = /\b\d{5}-\d{3}\b/


//event listener para botao login
document.addEventListener("DOMContentLoaded", function (){

    const loginButton = document.getElementById('loginButton')
    loginButton?.addEventListener('click', function() {

        let email = (<HTMLInputElement>document.getElementById('username')).value
        let password = (<HTMLInputElement>document.getElementById('password')).value
        let tipoLogin = (<HTMLInputElement>document.getElementById('opcao-login')).value
    
        if(emailRegex.test(email) && password){
            if(tipoLogin=='candidato'){

                if(LoginService.checarEmailCandidato(candidatos, email))
                {
                    if(LoginService.checarSenhaCandidato(candidatos, email, password)){
                        window.location.href = 'pagina-candidato.html'
                        LoginService.updateUsuarioAtual(email, password)
                    }
                    else{
                        alert('Senha incorreta. Tente novamente.')
                    }
                }
                else{
                    alert('Email não cadastrado. Cadastre-se clicando em "Cadastre-se como Candidato" para fazer login.')
                }

            }
            else if(tipoLogin=='empresa'){

                if(LoginService.checarEmailEmpresa(empresas, email))
                {
                    if(LoginService.checarSenhaEmpresa(empresas, email, password)){
                        window.location.href = 'pagina-empresa.html'
                        LoginService.updateUsuarioAtual(email, password)
                    }
                    else{
                        alert('Senha incorreta. Tente novamente.')
                    }
                }
                else{
                    alert('Email não cadastrado. Cadastre-se clicando em "Cadastre-se como Empresa" para fazer login.')
                }

            }
        }
        else{
            alert('Falha no login. Tente novamente.')
        }
    
    })

})

    

//event listener para botao cadastro candidato
const cadastroCandidatoButton = document.getElementById('cadastroCandidatoButton')
cadastroCandidatoButton?.addEventListener('click', function() {

    let nome=(<HTMLInputElement>document.getElementById('nome-candidato')).value
    let cpf=(<HTMLInputElement>document.getElementById('cpf-candidato')).value
    let idade=(<HTMLInputElement>document.getElementById('idade-candidato')).value
    let email=(<HTMLInputElement>document.getElementById('email-candidato')).value
    let password=(<HTMLInputElement>document.getElementById('password-candidato')).value
    let estado=(<HTMLInputElement>document.getElementById('estado-candidato')).value
    let cep=(<HTMLInputElement>document.getElementById('cep-candidato')).value
    let descricao=(<HTMLInputElement>document.getElementById('descricao-candidato')).value

    if(nomeRegex.test(nome) && cpfRegex.test(cpf) && idade && emailRegex.test(email) && password && estado && cepRegex.test(cep) && descricao)
    {
        if(LoginService.checarEmailCandidato(candidatos, email)){

            alert('Email já cadastrado. Faça login.')
        }
        else{

            let competencias: Array<boolean> = new Array<boolean>
            competencias[0]=(<HTMLInputElement>document.getElementById('0c')).checked
            competencias[1]=(<HTMLInputElement>document.getElementById('1c')).checked
            competencias[2]=(<HTMLInputElement>document.getElementById('2c')).checked
            competencias[3]=(<HTMLInputElement>document.getElementById('3c')).checked
            competencias[4]=(<HTMLInputElement>document.getElementById('4c')).checked
            competencias[5]=(<HTMLInputElement>document.getElementById('5c')).checked

            let novoCandidato: Candidato = new Candidato(nome, cpf, idade, email, password, estado, cep, descricao)
            for(let i=0; i<6; i++){
                if(competencias[i]){
                    novoCandidato.addCompetencia(i)
                }            
            }

            candidatos.cadastrarCandidato(novoCandidato)
            alert('Candidato cadastrado. Faça login.')

        }
    }
    else{
        alert('Falha no cadastro. Certifique-se de que seus dados são válidos e tente novamente.')
    }
})

//event listener para botao cadastro empresa
const cadastroEmpresaButton = document.getElementById('cadastroEmpresaButton')
cadastroEmpresaButton?.addEventListener('click', function() {

    let nome=(<HTMLInputElement>document.getElementById('nome-empresa')).value
    let cnpj=(<HTMLInputElement>document.getElementById('cnpj-empresa')).value
    let email=(<HTMLInputElement>document.getElementById('email-empresa')).value
    let password=(<HTMLInputElement>document.getElementById('password-empresa')).value
    let pais=(<HTMLInputElement>document.getElementById('pais-empresa')).value
    let estado=(<HTMLInputElement>document.getElementById('estado-empresa')).value
    let cep=(<HTMLInputElement>document.getElementById('cep-empresa')).value
    let descricao=(<HTMLInputElement>document.getElementById('descricao-empresa')).value

    if(nomeRegex.test(nome) && cnpjRegex.test(cnpj) && emailRegex.test(email) && password && pais && estado && cepRegex.test(cep) && descricao)
    {
        if(LoginService.checarEmailEmpresa(empresas, email)){

            alert('Email já cadastrado. Faça login.')
        }
        else{

            let competencias: Array<boolean> = new Array<boolean>
            competencias[0]=(<HTMLInputElement>document.getElementById('0e')).checked
            competencias[1]=(<HTMLInputElement>document.getElementById('1e')).checked
            competencias[2]=(<HTMLInputElement>document.getElementById('2e')).checked
            competencias[3]=(<HTMLInputElement>document.getElementById('3e')).checked
            competencias[4]=(<HTMLInputElement>document.getElementById('4e')).checked
            competencias[5]=(<HTMLInputElement>document.getElementById('5e')).checked

            let novaEmpresa: Empresa = new Empresa(nome, cnpj, email, password, pais, estado, cep, descricao)
            for(let i=0; i<6; i++){
                if(competencias[i]){
                    novaEmpresa.addCompetencia(i)
                }            
            }
            console.log("nova empresa criada e adicionada")
            console.log(novaEmpresa)
            empresas.cadastrarEmpresa(novaEmpresa)
            alert('Empresa cadastrada. Faça login.')
        }
    }
    else{
        alert('Falha no cadastro. Certifique-se de que seus dados são válidos e tente novamente.')
    }

})

// ver empresas na pagina candidato
function updateVerEmpresa (empresaIndex: number){

    const abaVerEmpresa = document.getElementById('ver-empresas')

    let listaEmpresas: Array<Empresa> = empresas.listarEmpresas()
    let verEmpresa: Empresa = listaEmpresas[empresaIndex]
    
    let detalhes: string = ''

    detalhes+=' </br> </br> <p>Descrição da empresa: ' + verEmpresa.descricao + '</p> </br>'
    detalhes+='<p>Localização da empresa: </p> </br>'
    detalhes+='<p>País: '+ verEmpresa.pais + '</p> </br> '
    detalhes+='<p>Estado: '+ verEmpresa.estado + '</p> </br>'
    detalhes+='<p>CEP: '+ verEmpresa.cep + '</p> </br>'

    let verCompetencias: Array<boolean> = verEmpresa.competencias

    detalhes+='<p>Competências desejadas pela empresa: </p> </br>'
    if(verCompetencias[0]) detalhes+='<p>' + 'Assembly' + '</p> </br>'
    if(verCompetencias[1]) detalhes+='<p>' + 'Frontend' + '</p> </br>'
    if(verCompetencias[2]) detalhes+='<p>' + 'Backend' + '</p> </br>'
    if(verCompetencias[3]) detalhes+='<p>' + 'Fullstack' + '</p> </br>'
    if(verCompetencias[4]) detalhes+='<p>' + 'DevOps' + '</p> </br>'
    if(verCompetencias[5]) detalhes+='<p>' + 'Cloud Computing' + '</p> </br>'

    if(abaVerEmpresa) abaVerEmpresa!.innerHTML=detalhes
    else console.log('null')

}

let empresaIndex: number = 0
updateVerEmpresa(empresaIndex)

const proximaEmpresaButton = document.getElementById('next-empresa')
proximaEmpresaButton?.addEventListener('click', function() {
    
    empresaIndex++
    if(empresaIndex==empresas.size()){
        empresaIndex = 0
    }

    updateVerEmpresa(empresaIndex)
})

/* excluir conta candidato */
const excluirCandidatoButton = document.getElementById('excluirCandidato')
excluirCandidatoButton?.addEventListener('click', function() {

    let password = (<HTMLInputElement>document.getElementById('senha-excluir')).value
    if(password){
        if(password==localStorage.getItem('passwordUsuario')){
            candidatos.excluirCandidato(localStorage.getItem('usuarioAtual')!)
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

/* ver candidatos na pagina empresa */
function updateVerCandidato (candidatoIndex: number){

    const abaVerCandidato = document.getElementById('ver-candidatos')

    let listaCandidatos: Array<Candidato> = candidatos.listaCandidatos()
    let verCandidato: Candidato = listaCandidatos[candidatoIndex]
    
    let detalhes: string = ''

    detalhes+=' </br> </br> <p>Descrição do candidato: ' + verCandidato.descricao + '</p> </br>'
    detalhes+='<p>Idade do candidato: ' + verCandidato.idade + '</p> </br>'
    detalhes+='<p>Localização do candidato: </p> </br>'
    detalhes+='<p>Estado: ' + verCandidato.estado + '</p> </br>'
    detalhes+='<p>CEP: ' + verCandidato.cep + '</p> </br>'

    let verCompetencias: Array<boolean> = verCandidato.competencias
    
    detalhes+='<p>Competências do candidato: </p> </br>'
    if(verCompetencias[0]) detalhes+='<p>' + 'Assembly' + '</p> </br>'
    if(verCompetencias[1]) detalhes+='<p>' + 'Frontend' + '</p> </br>'
    if(verCompetencias[2]) detalhes+='<p>' + 'Backend' + '</p> </br>'
    if(verCompetencias[3]) detalhes+='<p>' + 'Fullstack' + '</p> </br>'
    if(verCompetencias[4]) detalhes+='<p>' + 'DevOps' + '</p> </br>'
    if(verCompetencias[5]) detalhes+='<p>' + 'Cloud Computing' + '</p> </br>'

    if(abaVerCandidato) abaVerCandidato!.innerHTML=detalhes
    else console.log('null')


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