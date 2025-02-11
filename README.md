# 📌 Midaz K6 - Testes de Performance com Docker

Este projeto utiliza o [K6](https://k6.io/) para executar testes de performance de forma automatizada dentro de um container Docker.

---

## 🚀 Como executar os testes

Siga os passos abaixo para construir a imagem, subir o container e executar os testes de performance.

---

## 🔧 Passo 1: Construir a imagem Docker

Para construir a imagem do Docker, execute o seguinte comando:

```sh
docker-compose build --no-cache

## ▶️ Passo 2: Subir o container

Agora, suba o container em segundo plano utilizando:

```sh
docker-compose up -d

## 🖥️ Passo 3: Acessar o container

Para acessar o terminal do container, utilize:

```sh
docker exec -it midaz-k6-container /bin/bash

## ⚡ Passo 4: Executar um teste de performance

Para rodar um teste de performance utilizando o K6, execute o seguinte comando dentro do container:

```sh
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run scripts/postOrganizations.js

## 🔍 Explicação:

K6_WEB_DASHBOARD=true → Habilita a exibição do relatório em tempo real.
K6_WEB_DASHBOARD_EXPORT=html-report.html → Salva o relatório gerado em um arquivo HTML.
k6 run scripts/postOrganizations.js → Executa o teste de performance localizado em scripts/postOrganizations.js.

## 📊 Passo 5: Visualizar os resultados

✅ Em tempo real:
Durante a execução do teste, você pode visualizar os resultados em tempo real acessando:

🔗 http://localhost:5665/

## 📄 Após a execução:
Ao final do teste, um relatório será salvo em um arquivo chamado html-report.html na raiz do projeto.
Para visualizar os resultados, basta abrir esse arquivo no navegador.