## O que é esta API 
A API do Movies é um back end de controle de cinema. Nela é possível cadastrar um novo filme, visualisar todos os filmes e ver detalhes de apenas um filme. Apenas funcionários podem cadastrar novos filmes, e apenas o chefe pode deletar um filme. O chefe também poderá contratar novos funionários e demitir os mesmos. 

## Tecnologias usadas
- Node.JS
- Express.JS
- Typeorm
- Jest 
- PostgreSQL


## Como Rodar
1. Faça um colne do projeto na sua maquina
2. Abra o terminal no diretório da pasta e rode o comando 'yarn'
3. Crie um arquivo .env na raiz do projeto e ponha as credenciais de acordo com o modelo .env.exemple
4. Crie um arquivo ormconfig.json na raiz do seu projeto e ponha a seguinte estrutura com suas credenciais: OBS. _o projeto está configurado para o Docker_
{
    "type": "postgres",
    "host": "localhost",
    "port": ,
    "username": "",
    "password": "",
    "database": "",
    "entities": [
       "./src/app/model/**/*.ts"
    ],
    "migrations": [
       "./src/database/migrations/*.ts"
    ],    
    "cli": {
        "migrationsDir": "./src/database/migrations"
    }
}

5. Rode o comando yarn typeorm migration:run
6. Se rodar com o docker o comando é: docker run -p 5432:5432 -e POSTGRES_PASSWORD=1234 postgres
7. Para rodar o servidor, execute o comando 'yarn dev'
8. Comece a testar as rotas. Recomendo usar o Postman ou o Insomnia 
## Rotas

*EPLOYEE*
1. Nesta rota é possivel a criação de um novo funcionário. Apenas o chefe pode usar essa rota. 

curl -X POST \
'https://localhost:3333/employee'
H 'Barer: token_do_chefe'
-d '
    {
        "name": "filipe",
        "level_authorization": "1",
        "user_name": "filipe_mariz",
        "password": "teste_1234",
        "passwordConfirmation": "teste_1234"
    }
'

2. Nesta rota é possível visualizar todos os funionários. Apenas o chefe pode usar essa rota
curl -X GET \
'https://localhost:3333/employee'
H 'Barer: token_do_chefe'

3. Nesta rota é possível visualizar apenas um funionário. Apenas o chefe pode usar essa rota
curl -X GET \
'https://localhost:3333/employee/:id'
H 'Barer: token_do_chefe'

4. Nesta rota é possível deletar um funionário. Apenas o chefe pode usar essa rota
curl -X DELETE \
'https://localhost:3333/employee/:id'
H 'Barer: token_do_chefe'

5. Nessa rota, o funcionário pode se logar no sistema
curl -X POST \
'https://localhost:3333/employee/login'
-d '
    {
        "user_name": "filipe_mariz",
        "password": "teste_1234"
    }   
'

*MOVIES*
1. Nesta rota é possivel a criação de um novo filme. É preciso ser funcionário e ter token nível 2. Um fucionario irá cadastrar um novo filme, porém será salvo em disco, enquanto o funcionario responsável pela homologação do filme não autorizar o lançamento do filme no sistema
curl -X POST \
'https://localhost:3333/movies'
H 'Barer: token_do_chefe'
H 'Barer: TOKEN'
H 'Barer: VALIDATION'
-d '
    {
        "name": "filipe",
        "level_authorization": "1",
        "user_name": "filipe_mariz",
        "password": "teste_1234",
        "passwordConfirmation": "teste_1234"
    }
'
2. Nesta rota é possível visualizar todos os filmes. Apenas o chefe pode usar essa rota
curl -X GET \
'https://localhost:3333/movies'


3. Nesta rota é possível visualizar todos os filmes. Apenas o chefe pode usar essa rota
curl -X GET \
'https://localhost:3333/movies/:id'
P 'ID_MOVIE'

4. Nesta rota é possível deletar um filme. Apenas o chefe pode usar essa rota
curl -X DELETE \
'https://localhost:3333/employee/:id'
H 'Barer: token_do_chefe'
H 'Barer: TOKEN'
P 'ID_MOVIE'