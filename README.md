# Seja Bem Vindo ao repositório do desafio da Ng.cash!

Este Projeto a finalidade de  estruturar a aplicação web fullstack, com docker, com a finalidade de dos usuários cadastrados possam realizar transferências entre si

<br/><br/>

# Sumário

- [Instruções](#instruções)
- [Tecnologias](#tecnologias)
- [Executando o projeto](#executando-o-projeto)
- [Proximos passos](#proximos-passos)
- [Principal Desafio](#desafio-principal)

<br/><br/>

# Instruções:

Primeiro clone o repositorio para sua máquina local

```
git@github.com:claro-bruno/ngcash.git
```
após isso entre na pasta do repositorio

```
cd ng-cash
```

Logo em seguida, entre na pasta do backend e execute o comando para o docker iniciar:

```
docker-compose up -d
```


Utilize o comando abaixo para atualizar o banco de dados com a migraçao atual do prisma.

```
yarn install
yarn prisma migrate dev 
yarn prisma generate
```

E para finalizar, entre na pasta <strong>frontend</strong> e inicie o docker com o comando abaixo:

```
docker-compose build -d dev
docker-compose up -d dev
```

# Tecnologias

O front-end do projeto foi desenvolvido em React.js com o Vite e utilizando como nciador de estado Context-api, foram utilizadas as bibliotecas a baixo para auxiliar o desenvolvimento do projeto.

- `Axios`
- `eslint`
- `React-router-dom`
- `Typescript`
- `Vite`
- `React`
- `Docker`

<div align="center">
  <img alt="typescript" height="60" width="80" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
  <img alt="react" height="60" width="80" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
  <img alt="eslint" height="60" width="80" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" />
  <img alt="axios" height="60" width="80" src="https://upload.wikimedia.org/wikipedia/commons/c/c8/Axios_logo_%282020%29.svg" />
  &nbsp
  <br />
  <br />
</div>
  
  O back-end do projeto foi desenvolvido em Node.js com Express e Typescript. As tecnologias para desenvolver a API foram as seguintes:

- `Docker`
- `Node.js`
- `Express`
- `PostgreSql`
- `Eslint`
- `Typescript`
- `Prisma`
- `Dotenv`
- `JWT`

<div align="center">
  <img alt="Node" height="60" width="80" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
  <img alt="express" height="60" width="80" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" />
  <img alt="eslint" height="60" width="80" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" />
  <img alt="typescript" height="60" width="80" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
  <img height="65" width="80" src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_light_prisma_icon_130444.png" />
  <br />
  <br />
</div>
<br/><br/>
<br/><br/>

# Executando o projeto

`Front-end`
<br/><br/>

- Login
  ![Login](https://user-images.githubusercontent.com/11656352/203222190-052d60da-d4cd-4693-9765-73a3b7ccdab8.png)
- Home
  ![Home](https://user-images.githubusercontent.com/11656352/203222586-78e6cbdf-e4d5-4f95-a356-414b0c1a0c35.png)
- Cadastro

  ![Registrar](https://user-images.githubusercontent.com/11656352/203222347-e3f15a0c-65d8-45aa-9e1a-e33fe837e817.png)
  <br/><br/>
  `Back-end`

- Post Registro

![Rota Registro](https://user-images.githubusercontent.com/11656352/203222838-30bcda18-6a19-4c10-bcab-ddf04180e1a0.png)

- Post Loogin

![Rota Autenticação](https://user-images.githubusercontent.com/11656352/203222982-1152a1ae-3ddb-4a30-b12a-a568e0b07c6a.png)


- Get Balance

![Rota Balance](https://user-images.githubusercontent.com/11656352/203223250-f2c858c2-f88d-40b8-9ea6-1f0f79b07ee2.png)

- Create Transation

![Rota Post Transaction](https://user-images.githubusercontent.com/11656352/203224640-63322b6b-48ef-4a52-9ef0-640647bdd66a.png)

- Get Transactions

![Rota Get Transactions](https://user-images.githubusercontent.com/11656352/203224844-12f21ea0-a7eb-4134-99ac-304ef48340d8.png)


<br/><br/>

# Testes do Backend

Para testar o backend foi utilizado o jest sincronizado com o database postgresql dockerizado. Através do comando abaixo:
```
yarn docker:up && yarn prisma migrate deploy && jest -i
```

que foi padronizado no package.json pelo comando yarn test

![image](https://user-images.githubusercontent.com/11656352/203225561-ae0c0fca-cc46-43a5-9d7e-562e36399601.png)
![image](https://user-images.githubusercontent.com/11656352/203225640-89bb90f5-ee3d-4acf-bdef-e6ad048ec4bb.png)

# Documentação da API

Foi utilizado o swagger para gerar a documentação, através da rota /api-docs, formalizada na url 

![image](https://user-images.githubusercontent.com/11656352/203226737-8783b3c0-c08d-4dda-9706-2c729fa3922e.png)

# Desafio Principal

O principal desafio do projeto foi organizar por onde seria iniciado a produção, alem disso, houveram problemas na hora da dockerização do back-end que me impediram de concluir 100% do projeto.

<br/><br/>

# Proximos passos

O proximo passo seria iniciar os testes do front end e finaliza-los, além de implementar de novas idéias e melhoria do Layout no CSS.
