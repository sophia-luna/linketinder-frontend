import { CandidatoDAO } from "../DAO/candidatoDAO";
import { EmpresaDAO } from "../DAO/empresaDAO";
import { VagaDAO } from "../DAO/vagaDAO";
import { Chart } from "../Utils/chart";
import { botaoLogin } from "../UI/login";
import { botaoCadastroCandidato, botaoExcluirCandidato, botaoProximoCandidato, updateVerCandidato } from "../UI/candidatoUI";
import { botaoCadastroEmpresa, botaoExcluirEmpresa } from "../UI/empresaUI";
import { botaoCadastroVaga, botaoExcluirVaga, botaoProximaVaga, updateVerVaga } from "../UI/vagaUI";


let candidatos: CandidatoDAO = new CandidatoDAO
let empresas: EmpresaDAO = new EmpresaDAO
let vagas: VagaDAO = new VagaDAO


document.addEventListener("DOMContentLoaded", function (){

    const loginButton = document.getElementById('loginButton')
    loginButton?.addEventListener('click', () => { 
        botaoLogin(candidatos, empresas) 
    })

})

const cadastroCandidatoButton = document.getElementById('cadastroCandidatoButton')
cadastroCandidatoButton?.addEventListener('click', () => {
    botaoCadastroCandidato(candidatos)
})

const cadastroEmpresaButton = document.getElementById('cadastroEmpresaButton')
cadastroEmpresaButton?.addEventListener('click', () => {
    botaoCadastroEmpresa(empresas)
})

const cadastroVagaButton = document.getElementById('cadastroVagaButton')
cadastroVagaButton?.addEventListener('click', () => {
    botaoCadastroVaga(vagas)
})

const proximaEmpresaButton = document.getElementById('next-vaga')
proximaEmpresaButton?.addEventListener('click', () => {
    botaoProximaVaga(vagas)
})

const excluirCandidatoButton = document.getElementById('excluirCandidato')
excluirCandidatoButton?.addEventListener('click', () => {
    botaoExcluirCandidato(candidatos)
})

const proximoCandidatoButton = document.getElementById('next-candidato')
proximoCandidatoButton?.addEventListener('click', () => {
    botaoProximoCandidato(candidatos)
})

const excluirVagaButton = document.getElementById('excluirVaga')
excluirVagaButton?.addEventListener('click', () => {
    botaoExcluirVaga(vagas)
})

const excluirEmpresaButton = document.getElementById('excluirEmpresa')
excluirEmpresaButton?.addEventListener('click', () => {
    botaoExcluirEmpresa(empresas, vagas)
})

updateVerVaga(vagas)
updateVerCandidato(candidatos)

var chart = Chart.chartCompetencias(candidatos)
chart.render();
