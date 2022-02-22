# Objetivo do projeto 

Crie um projeto Web o uma API REST para uma seguradora de veículos.
Tecnologias que devem ser usadas:
- Spring Boot (Maven ou Gradle);
- MongoDB ou um banco de dados relacional;
- Bootstrap, Angular ou outro framework para front-end (caso escolha projeto Web).



CRUD de clientes:
- Dados: Nome Completo, CPF, Cidade e UF;
- Todos os dados são obrigatórios;
- CPF deve ser válido e deve ser único na base.


CRUD de apólices:
- Dados: Número da apólice, Início de vigência, Fim de vigência, Placa do veículo e Valor da apólice;
- Todos os dados são obrigatórios;
- O número da apólice deve ser gerado aleatoriamente e ser único.


Consultar uma apólice por número:
- Tela ou endpoint separado dos CRUDs;
- Informar se a apólice venceu ou não;
- Informar quantos dias para vencer, ou há quantos dias venceu;
- Informar placa do veículo e valor da apólice.

# Api para  seguradora 

# Sobre o projeto
Este projeto tem como finalidade atender aos requisito solicitados no teste técnico para vaga de 
desenvolvedor java junior da empresa equiplano, nele foi criado uma api com os cruds de cliente e apolice

# Tecnologias ultilizadas
- Spring boot
- Maven
- Java
- Mysql
- Jpa
- Html
- Bootstrap
- Angular
- Reactjs
- Typescript

## Como executar a parte do backend
Obs: Gerei a imagem com uma url remota para o mysql, caso queira ganhar tempo a imagem já aponta para um banco de dados
que só tem essa base de dados e um unico usuário.

- Criando  o banco de dados

```mysql
create database seguro;
```

- Insert na tabela cliente
```mysql

INSERT INTO cliente VALUES (1,'RECIFE','12170170626','LAÍS CRISTIANE NINA SILVEIRA TESTE','PE'),
(2,'JOÃO PESSOA','30421508280','FLÁVIA ISADORA DA MOTA','PB'),
(4,'CAXIAS DO SUL','35265165452','CARLOS EDUARDO MENDES','RS'),
(5,'MANAUS','83463962446','ALICE NINA LIZ ALMEIDA','AM'),
(6,'ARACAJU','47891020680','HELOISE ELAINE CAROLINA ALVES','SE'),
(7,'JOÃO PESSOA','99515005019','ANTONIO KEVIN PEDRO FIGUEIREDO','PB'),
(8,'CARIACICA','32962689876','KAMILLY AYLA DA SILVA','ES'),
(9,'LUZIÂNIA','51133381847','THIAGO DANILO DA CUNHA','GO'),
(13,'FLORIANÓPOLIS','52772037290','MANUEL LUAN MENDES','SC');


```

- Insert na tabela apolice


Obs: No desafio técnico na tabela apolice não consta os dados do cliente, mas eu entendi que 
como preciso desenvolver o sistema de uma seguradora, seria necessário que pra cada apolice 
existice um cliente



```mysql

INSERT INTO apolice VALUES 
(1,'2023-02-04','2022-02-04',7225462259829381393,'IMP-2103',86000.78,5),
(4,'2023-02-06','2022-02-06',217058556328658012,'KYF-0278',92000.00,8),
(5,'2023-02-16','2022-02-16',7617584464970753296,'AFG-0477',92000.00,1),
(6,'2023-02-28','2022-02-28',7824540065467513333,'BRA-8591',92000.00,13),
(7,'2023-03-01','2022-03-01',7902781323341601455,'UBZ-2181',92000.00,13);

```



- baixar a imagem do dockerhub


```docker
docker pull redufrei87/api-seguro:v.01
 ```


- Para verificar se a imagem foi baixada:
```docker
docker images
 ```

- Para rodar o container na porta 8080 e não travar o terminal digite:

```docker
docker run -d -p 8080:8080 <id da imagem>
 ```


Se tudo correr bem será impresso o id do container no terminal

Depois de alguns segundos digite a seguinte url de teste(Este procedimento foi realizado na minha maquina local):
http://localhost:8080/api/cliente



#  A parte do frontend é responsiva



# Endpoints
local 
url= localhost:8080

## Cliente

- Cadastro


Verbo post


url/api/cliente


Parametros esperados 

```json
{

"nome":"Campo com no minimo 3 e no maximo 255 caracteres ",
"cidade":"Campo com no minimo 3 e no maximo 60 caracteres",
"uf":"Campo com no minimo 2 e no maximo 3 caracteres",
"cpf":"Cpf válido "

}
 ```



Retorno:


Hipótese 1: Caso algum campo obrigatório falte ou haja falha nos dados enviados haverá um  retorno 400 com os erros


Hipótese 2 : Caso tudo esteja ok, haverá um retorno 201 com mensagem



- Alteração


Verbo put


url/api/cliente


Obs: Caso o id não exista ou seja vazio ele cria um novo cliente


Parametros esperados
```json
{
"id":"1",
"nome":"Campo com no minimo 3 e no maximo 255 caracteres ",
"cidade":"Campo com no minimo 3 e no maximo 60 caracteres",
"uf":"Campo com no minimo 2 e no maximo 3 caracteres",
"cpf":"Cpf válido "

}
 ```


Retorno:


Hipótese 1: Caso algum campo obrigatório falte ou haja falha nos dados enviados haverá um  retorno 400 com os erros


Hipótese 2 : Caso tudo esteja ok, haverá um retorno 200 com mensagem







- Lsitar todos


Verbo get


url/api/cliente


Retorno:


Hipótese 1: Caso não haja nenhum registro a api retorna 404 com mensagem


Hipótese 2 : Caso haja registro a api retorna 200 com  um Json contendo a lista de registros



- Buscar por id


Verbo get


url/api/cliente/id

Parametros esperados


Um id de cliente 


Retorno:


Hipótese 1: Caso não haja cliente com o id a api retorna 404 sem mensagem


Hipótese 2 : Caso haja registro a api retorna 200 com  um Json contendo o objeto cliente


Buscar por cpf
Verbo get
api/cliente/buscarPorCpf/cpf

Parametros esperados :

Um cpf 

Retorno:


Hipótese 1: Caso o cpf não exista na base de dados a api devolve um 404 sem mensagem


Hipótese 2 : Caso haja registro a api retorna 200 com  um Json contendo o objeto cliente


- Deletar


Verbo delete


url/api/cliente/id


Parametros esperados:


Um id de cliente 

Obs: Não está escrito implicitamente mais eu entendo que uma apolice precisar ter um cliente, por este motivo adicionei 
um campo a mais na tabela apolice, e este metodo pode ter ligação com a tabela apolice.


Retorno:


Hipótese 1 : Caso não haja  cliente com o id a api retorna 404 com mensagem


Hipótese 2: Caso o cliente tenha 1 ou mais apolices a api  retorna 400 com mensagem informando que
é necessário excluir todas  as apolices do cliente para que o registro do mesmo seja excluido.


Hipótese 3 : Caso haja o registro sem apolice a api retorna 204 com mensagem




# Fiz o deploy do crud de cliente, a url para realizar o crud : https://rogerdesenvolvedorweb.com.br/angular/seguro/







## Apolice


- Cadastro


Verbo post


url/api/apolice


Parametro esperado
```json
{

"fim":"Data do fim da apolice ",
"inicio":"Data com o inicio da apolice",
"numero":"Campo em branco , pois a aplicação que é responsável por gerar o numero",
"placa":"Placa de veiculo",
"valor":"Valor minimo esperado no formato 0.99, valor maximo esperado no formato 999999.99",
"cliente":"id de cliente"
}
 ```


 
Retorno:


Hipótese 1 : Se a data final for menor que a data inicial a api retorna 400, com mensagem informando o erro


Hipótese 2 :Se estiver tudo ok a api retorna 201 com o numero da apolice


- Alteração


Verbo put


url/api/apolice

Parametro esperado
```json
{
"id":"id da apolice"
"fim":"Data do fim da apolice ",
"inicio":"Data com o inicio da apolice",
"numero":"Campo com o numero da apolice",
"placa":"Placa de veiculo",
"valor":"Valor minimo esperado no formato 0.99, valor maximo esperado no formato 999999.99",
"cliente":"id de cliente"
}
```


Retorno:


Hipótese 1 : Se a data final for menor que a data inicial a api retorna 400, com mensagem informando o erro


Hipótese 2 : Se o id da apolice ou o id do cliente for nulo  a api retorna 400, com mensagem informando o erro


Hipótese 3 :Se estiver tudo ok a api retorna 200 com o numero da apolice


Hipótese 4 :Caso haja erro no formato da data ou no valor da apolice a api retorna 404 com uma meensagem generica




- Lsitar todos


Verbo get


url/api/apolice

Retorno:


Hipótese 1: Caso não haja nenhum registro a api retorna 404 com mensagem


Hipótese 2 : Caso haja registro a api retorna 200 com  um Json contendo a lista de registros



- Buscar por id


Verbo get


url/api/apolice/id

Parametros esperados:


Um id de apolice


Retorno:


Hipótese 1 : Caso haja registro a api retorna 200 com  um Json contendo o objeto apolice


Hipótese 2: Caso não haja nenhum registro a api retorna 404 sem mensagem




- Deletar


Verbo delete


url/api/apolice/id

Parametros esperados:


Um id de apolice

Retorno:


Hipótese 1 : Caso haja registro a api retorna 204 com mensagem


Hipótese 2: Caso não haja nenhum registro a api retorna 404 com mensagem

# Fiz o deploy do crud de apolice, a url para realizar o crud : https://rogerdesenvolvedorweb.com.br/angular/seguro/


Na tela principal no menu clique em apólice para realizar o crud.


## Consultar Apolice

- Consultar por numero da apolice


Verbo get


url/api/apolice/consulta/numero

Parametros esperados:


Numero da apolice

Retorno:


Hipótese 1: Caso não haja nenhum registro a api retorna 404 com mensagem


Hipótese 2: Caso haja registro a api retorna 200 com um Json contendo as seguintes informações :

```json
{
"status":"Informa se a apolice venceu ou não",
"situacao":"Informa a quantidade de dias que venceu ou que vencerá",
"placa":"Placa do automóvel",
"valor":"valor da apolice"
}
```

# Fiz o deploy desta parte de consulta no netlify, a url para consular apólice :  https://gracious-hopper-73d050.netlify.app/






