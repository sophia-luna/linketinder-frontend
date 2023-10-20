import { EmpresaDAO } from "../DAO/empresaDAO"
import { Empresa } from "../model/empresa"
import { campoNomeEmpresa, campoCnpjEmpresa, campoEmailEmpresa, campoSenhaEmpresa, campoPaisEmpresa, campoEstadoEmpresa, campoCepEmpresa, campoDescricaoEmpresa } from "../Utils/acessoHtml"
import { nomeRegex, cpfRegex, emailRegex, cepRegex, cnpjRegex } from "../Utils/regex"
import { checarEmailEmpresa } from "../Utils/empresaUtil"
import { VagaDAO } from "../DAO/vagaDAO"

export function botaoCadastroEmpresa(empresas: EmpresaDAO) {

    let nome = campoNomeEmpresa.value
    let cnpj = campoCnpjEmpresa.value
    let email = campoEmailEmpresa.value
    let senha = campoSenhaEmpresa.value
    let pais = campoPaisEmpresa.value
    let estado = campoEstadoEmpresa.value
    let cep = campoCepEmpresa.value
    let descricao = campoDescricaoEmpresa.value

    if(nomeRegex.test(nome) && cnpjRegex.test(cnpj) && emailRegex.test(email) && senha && pais && estado && cepRegex.test(cep) && descricao)
    {
        if(checarEmailEmpresa(empresas, email)){

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

}

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

export function botaoExcluirEmpresa(empresas: EmpresaDAO, vagas: VagaDAO) {

    let password = (<HTMLInputElement>document.getElementById('senha-exclusao')).value
    if(password){

        if(password==localStorage.getItem('passwordUsuario')){

            empresas.excluirEmpresa(localStorage.getItem('usuarioAtual')!, vagas)
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

}