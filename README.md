# Planium

<a href="#sobre">Sobre</a> |
<a href="#tecnologias">Tecnologias</a> |
<a href="#linkApp">Link da Aplicação</a> |
<a href="#documentação">Documentação</a> |
<a href="#local">Rodando o projeto local</a> 
</p>

<img width="300xp" src="https://gust-production.s3.amazonaws.com/uploads/startup/panoramic_image/985889/office.jpg"/>

Uma aplicação **full-stack** desenvolvida para a empresa Planium, com o objetivo de desenvolver uma API back-end e criar uma página front-end para consumir os dados da API desenvolvida.

<h2 id="tecnologias">🛠 Tecnologias ⬇️</h2>
<b> Front-End: </b>

- [JavaScript](https://www.javascript.com/)
- [ReactJS](https://pt-br.reactjs.org/)
- [Styled Components](https://styled-components.com/)
- [Axios](https://axios-http.com/ptbr/docs/intro)

<b> Back-End: </b>

- [TypeScript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/docs/)


<h2 id="linkApp">🔗 Link da Aplicação</h2>

- http://planium.surge.sh/


<h2 id="documentação">📃 Documentação da API no Postman</h2>

- [Postman](https://documenter.getpostman.com/view/20352466/2s847CvE7A)


<h2 id="local"> 💻 Rodando o projeto na sua máquina</h2>

- Um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)
- Para fazer a instalação você vai precisar do [Node.JS](https://nodejs.org/en/download/)

### Como instalar e rodar
* Para baixar o projeto
```
1. git clone https://github.com/LopesEduarda/Planium.git
```
* Para instalar e rodar o server (obrigatório)
```
2. npm install
```
3- npm run dev para rodar o back-end;
```
4- npm run start para rodar o front-end.
```

## OBSERVAÇÕES: 

- Foi o meu primeiro contato manipulando arquivos JSON, então consegui quase 100%, mas com um pequeno detalhe: ao adicionar um novo beneficiário, o mesmo vai para o arquivo de 
beneficiários e de propostas.json como pedido, mas não vai formatado corretamente, sendo necessário entrar nos respectivos arquivos e remover os colchetes [] que vem junto! 
Ao invés de incrementar um beneficiário em seguida do outro, um objeto dentro do array já existente, ele simplesmente cria outro array. Não consegui fazer o incremente.

- Por isso, no front-end acontece a mesma coisa: ao adicionar um novo beneficiário no front-end, é necessário repetir os passos acima no back para fazê-los aparecer na tela, no botão de beneficiários.





