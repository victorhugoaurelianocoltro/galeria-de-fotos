"use strict";

// Caso o backend ainda não esteja rodando, o carrossel exibirá mensagem de erro.

const trilhaFotos = document.getElementById("trilha-fotos");
const botaoAnterior = document.getElementById("botao-anterior");
const botaoProximo = document.getElementById("botao-proximo");

let indiceAtual = 0;

// URL da API JSON Server
const URL_API = "http://localhost:3000/fotos";

// Lista de fotos será preenchida pela API
let minhasFotos = [];

  


function mostrarFotos() {
  trilhaFotos.innerHTML = minhasFotos
    .map(
      (foto) => `
        <div class="item-foto">
          <img src="${foto.imagem}" alt="${foto.legenda}" />
          <p class="legenda">${foto.legenda}</p>
        </div>`
    )
    .join("");
  atualizarCarrossel();
}

function atualizarCarrossel() {
  const itensFoto = document.querySelectorAll('.item-foto');
  itensFoto.forEach((item, i) => {
    item.classList.toggle('ativo', i === indiceAtual);
  });

  const deslocamento = -indiceAtual * 33.333;
  trilhaFotos.style.transform = `translateX(${deslocamento}%)`;
}

function voltarFoto() {
  indiceAtual = indiceAtual > 0 ? indiceAtual - 1 : minhasFotos.length - 1;
  atualizarCarrossel();
}

function proximaFoto() {
  indiceAtual = indiceAtual < minhasFotos.length - 1 ? indiceAtual + 1 : 0;
  atualizarCarrossel();
}

botaoAnterior.addEventListener("click", voltarFoto);
botaoProximo.addEventListener("click", proximaFoto);

async function carregarFotos() {
  try {
    const resposta = await fetch(URL_API);
    if (!resposta.ok) throw new Error("Falha ao carregar imagens");
    minhasFotos = await resposta.json();
    mostrarFotos();
  } catch (erro) {
    console.error(erro);
    trilhaFotos.innerHTML = `<p class="erro">Erro ao carregar fotos</p>`;
  }
}

document.addEventListener("DOMContentLoaded", carregarFotos);
