# Hello Client

Aplicação Angular para **cadastro de clientes**, com suporte a **português** e **inglês**.

## 📋 Descrição

O **hello-client** é um sistema de front-end desenvolvido em Angular com o objetivo de facilitar o gerenciamento e o cadastro de clientes. A aplicação suporta múltiplos idiomas e oferece uma interface responsiva e moderna.

## 🌐 Idiomas Suportados

- 🇧🇷 Português
- 🇺🇸 Inglês

## 🛠️ Tecnologias Utilizadas

- Angular 19 (com Standalone Components)
- i18n (internacionalização compilada)
- ngx-translate (tradução dinâmica)
- TypeScript

## 🚀 Como Executar

### Pré-requisitos

- Node.js (v22 ou superior)

### Instalação
Clone o repositório:

```bash
git clone https://github.com/FernandoNv/hello-client.git
cd hello-client
```

### Rodar a aplicação

#### Rodar em inglês
```bash
npm i
npm run start
```
A aplicação irá estar disponível em localhost:4200

### Rodar em português e inglês
Para o suporte a português, precisamos fazer o build e servir o app. Para isso executamos o seguinte comando:
```bash
npm run start-build
```
Caso o terminal peça para confirmar uma ação, aperte em confirmar pois ele vai instalar o http-server caso não esteja instalado. Esse comando roda as seguintes instruções:
```bash
ng build && npx http-server .\dist\hello-client\browser\
```

Ao final do comando irá aparecer a rota da aplicação.
Ex:
```bash
Available on:
  http://192.168.1.5:8080
  http://127.0.0.1:8080
```
Ao acessar a rota iremos ter as duas opções de idiomas
```bash
en/
pt/
```
Então é só utilizar.

Valeu! 👍
