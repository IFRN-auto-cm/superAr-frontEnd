# SuperAr Frontend

<p align="center">
  <img src="https://github.com/IFRN-auto-cm/docs/blob/main/superAr.png" width="180">
</p>

<p align="center">

Frontend Web do projeto <b>SuperAr</b>

Sistema para monitoramento e controle inteligente de aparelhos de ar-condicionado.

</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Material UI](https://img.shields.io/badge/Material_UI-7-007FFF?logo=mui)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript)
![Git](https://img.shields.io/badge/Git-Submodule-F05032?logo=git)
![License](https://img.shields.io/badge/License-MIT-green)

</p>

---

# Sumário

* [Sobre](#sobre)
* [Arquitetura](#arquitetura)
* [Projeto Principal](#projeto-principal)
* [Backend](#backend)
* [Tecnologias](#tecnologias)
* [Template Utilizado](#template-utilizado)
* [Estrutura do Projeto](#estrutura-do-projeto)
* [Instalação](#instalação)
* [Execução](#execução-com-docker)
* [Fluxo de Desenvolvimento](#fluxo-de-desenvolvimento)
* [Funcionalidades Implementadas](#funcionalidades-implementadas)
* [Endpoints Consumidos](#endpoints-consumidos)
* [Roadmap](#roadmap)

---

# Sobre

O **SuperAr Frontend** é a interface web do projeto **SuperAr**, responsável pelo gerenciamento, monitoramento e controle remoto de aparelhos de ar-condicionado.

A aplicação comunica-se com o backend através de APIs REST e receberá atualizações em tempo real utilizando **Socket.IO**.

---

# Arquitetura

```text
                  +---------------------+
                  |     Navegador       |
                  +----------+----------+
                             |
                             |
                        React + MUI
                             |
                             |
                 HTTP / Socket.IO
                             |
                             |
                  +----------v----------+
                  |   SuperAr Backend   |
                  +----------+----------+
                             |
          +------------------+-------------------+
          |                                      |
       MySQL                                 MQTT Broker
          |                                      |
          +------------------+-------------------+
                             |
                          ESP8266
                             |
                      Ar-condicionado
```

---

# Projeto Principal

Este repositório é um **submódulo** do projeto principal.

Repositório principal:

https://github.com/IFRN-auto-cm/superAr

Backend:

https://github.com/IFRN-auto-cm/superAr-backEnd

---

# Tecnologias

* React
* Material UI
* Axios
* Socket.IO
* React Router
* JavaScript ES6
* HTML5
* CSS3

---

# Template Utilizado

O projeto utiliza como base o template **Material Dashboard React**, desenvolvido pela **Creative Tim**.

O template fornece uma estrutura moderna para aplicações administrativas, incluindo:

* Layout responsivo
* Sistema de rotas
* Componentes Material UI
* Dashboard
* Navegação lateral
* Temas

Página oficial

https://www.creative-tim.com/product/material-dashboard-react

Repositório oficial

https://github.com/creativetimofficial/material-dashboard-react

Demo do template

https://demos.creative-tim.com/material-dashboard-react/#/dashboard

---

# Estrutura do Projeto

```text
src/
│
├── assets/
├── components/
├── context/
├── examples/
├── layouts/
├── routes/
├── services/
├── utils/
└── App.js

public/

docs/

package.json
```

---

# Instalação

Clone o projeto principal juntamente com todos os submódulos.

```bash
git clone --recurse-submodules https://github.com/IFRN-auto-cm/superAr.git
```

Caso tenha esquecido de utilizar `--recurse-submodules`:

```bash
git submodule update --init --recursive
```

---

# Execução com Docker

Executar o projeto:

Na pasta principal do projeto onde está o arquivo docker-compose.dev.yml execute o comando abaixo.

```bash
docker compose -f docker-compose.dev.yml up -d
```

---

# Fluxo de Desenvolvimento

Nunca desenvolva diretamente na branch **master**.

Fluxo recomendado:

```text
master
   ▲
   │
desenvolvimento
   ▲
   │
recurso/*
```

---

# Funcionalidades Implementadas

* [ ] Dashboard
* [ ] Login
* [x] Cadastro de usuários
* [x] Cadastro de salas
* [x] Cadastro de aparelhos
* [x] Cadastro de modelos
* [x] Cadastro de comandos
* [ ] Associação Modelo × Comando
* [ ] Controle do ar-condicionado
* [ ] Alteração de temperatura
* [ ] Visualização da planta baixa
* [ ] Atualização em tempo real via Socket.IO
* [ ] Histórico de eventos
* [ ] Sistema de filtros
* [ ] Interface responsiva

---

# Endpoints Consumidos

| Método | Endpoint               | Descrição                 |
| ------ | ---------------------- | ------------------------- |
| GET    | /salas                 | Lista salas               |
| POST   | /salas                 | Cadastra sala             |
| PUT    | /salas/{id}            | Atualiza sala             |
| DELETE | /salas/{id}            | Remove sala               |
| GET    | /ar_cadastrados        | Lista aparelhos           |
| POST   | /ar_cadastrados        | Cadastra aparelho         |
| PUT    | /ar_cadastrados/{id}   | Atualiza aparelho         |
| DELETE | /ar_cadastrados/{id}   | Remove aparelho           |
| GET    | /modelos_marcas        | Lista modelos             |
| POST   | /modelos_marcas        | Cadastra modelo           |
| GET    | /comandos              | Lista comandos            |
| POST   | /comandos              | Cadastra comando          |
| POST   | /modelosMarcas_comando | Associa comando ao modelo |

---

# Roadmap

* [ ] Dashboard
* [x] Cadastro de aparelhos
* [x] Cadastro de salas
* [ ] Controle do ar
* [ ] Socket.IO
* [ ] Planta baixa
* [ ] Gráficos estatísticos
* [ ] Controle de permissões
* [ ] Modo escuro

---

# Licença

Este projeto faz parte do projeto **SuperAr**, desenvolvido pelo **Instituto Federal do Rio Grande do Norte (IFRN)** para pesquisa e desenvolvimento de soluções voltadas ao monitoramento e controle inteligente de ambientes climatizados.

