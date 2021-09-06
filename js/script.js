let seuVotoPara = document.querySelector('.estrutura-1 span');
let cargo = document.querySelector('.estrutura-2 span');
let descricao = document.querySelector('.estrutura-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.estrutura-right');
let numeros = document.querySelector('.estrutura-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function atualizaTela(){
    let etapa = candidatos[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = 'Nome: '+candidato.nome+'<br/>'+'Partido: '+candidato.partido;

    }else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTAÇÃO NULA</div>';
    }
}

function clicou(numeracao) {
    let numeroVotacao = document.querySelector('.numero.pisca');
    if(numeroVotacao !== null) {
        numeroVotacao.innerHTML = numeracao;
        numero = numero+numeracao;

        numeroVotacao.classList.remove('pisca');
        if( numeroVotacao.nextElementSibling !== null){
            numeroVotacao.nextElementSibling.classList.add('pisca');
        } else {
            atualizaTela();
        }
    }
} 

function branco() {
    numero === ''
    votoBranco = true;

    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';

    
}

function corrige() {
    iniciaVotacao();
}

function confirma() {
    let etapa = candidatos[etapaAtual];

    let votoConfirmado = false;

    if(votoBranco === true) {
        votoConfirmado = true;

        votos.push({
            etapa: candidatos[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;

        votos.push({
            etapa: candidatos[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(candidatos[etapaAtual] !== undefined) {
            iniciaVotacao();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
            console.log(votos);
        }
    }
}

function iniciaVotacao() {
    let etapa = candidatos[etapaAtual];

    let numeroHTML = '';
    numero = '';
    votoBranco = false;

    for(let i=0;i<etapa.numeros;i++) {
        if(i ===0) {
            numeroHTML += '<div class="numero pisca"></div>';
        } else{
            numeroHTML += '<div class="numero"></div>';
        }    
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}

iniciaVotacao();