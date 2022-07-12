import express, { request } from 'express';
import { StatusCodes} from 'http-status-codes';
//criar o nosso server e chamada da funcao, 

const app = express();

//ta criando um neither, para definir que todos os requests estao em json
const PORT = process.env.PORT || 3000;
//colocada a opção de usar uma variavel do ambiente ou usar o 3000 default

//Vamos usar a env

let users = [
    {id: 1, name: 'Rafael Ribeiro', age: 31, },
    {id: 2, name: 'Gabriel Custódio', age: 27, },
];

app.use(express.json());

//criar as rotas e consultar a documentacao.

app.listen(PORT, () => {
//AGORA escutar a port, com a função de callback
//isso pois se é true ele mostra a função.
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    //sem definir a rota, não mostra nada.
});

//devemos criar uma rota de get
app.get('/', (request, response) => {
    //quero disponibilzar a raiz, a funcao recebe dois parametros
    //request e response
    //vamos dar um retorno em html
    return response.send('<h1>Trabalhando com servidor express.</h1>');
});

//vamos criar a rota de GEt 
app.get('/users', (request, response) =>{
    return response.send(users);
    //dessa forma mando a lista de usuarios para a pasta /users
})

//----- para pegar um usuario especifico, preciso criar uma variavel
app.get('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    //vamos usar uma request.params e nome userId.
    const user = users.find(user => {
        return (user.id === Number(userId))
    })
    return response.send(user);
    //vamos usar o recurso find dentro da lista, ao inves do for
});
//usar nova funcao de callback
//para enviar devemos padronizar o formato de envio de infos
app.post('/users', (request, response) => {
    const newUser = request.body;
    //o body entra como novo usuário
    
    users.push(newUser);

    return response.status(StatusCodes.CREATED).send(newUser);
    //o status ok é o status 200
    //o status created é o 201
    //para avaliar se o post funciona, teremos que outra ferraemnta 
    //além do browser
    //
    
} )

//------ Criar o recurso de PUT
app.put('/users/:userId', (request, response) =>{
    const userId = request.params.userId;
    const updatedUser = request.body;
    //a atualização do usuario virá pelo body
    //para atualizar a minha lista
    users = users.map(user => { 
        if (Number(userId) === user.id) {
            return updatedUser;
        }
        return user;
    })

    return response.send(updatedUser);
    //trabalhar com uma lista modificada
});

app.delete('/users/:userId', (request, response) => {
    const userId = request.params.userId;

    users = users.filter((user) => user.id !== Number(userId));
//dessa form estou deletando todos que nao userId.

    return response.status(StatusCodes.NO_CONTENT).send();
  })


