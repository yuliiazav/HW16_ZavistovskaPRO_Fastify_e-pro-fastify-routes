import Fastify from 'fastify';

import {users} from './users';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

export default fastify;

// 1 Должен иметь роут /uppercase(POST) на который отправляя строку, возвращает её
// в uppercase со статусом 200. Если строка содержит слово
// fuck(не зависит от регистра), роут должен вернуть 403 статус и строку unresolved

fastify.post('/uppercase', {
  schema: {
    body: {
      type: 'string'
    }
  }
}, function (request, reply) {
  const response = request.body.toUpperCase();
  if (response.includes("FUCK")) {
    reply.status(403).send("unresolved");
  } else {
    reply.status(200).send(response);
  }
})
//2 Должен иметь роут /lowercase(POST) с абсолютно аналогичным функционалом,
// только строку в lowercase

fastify.post('/lowercase', {
  schema: {
    body: {
      type: 'string'
    }
  }
}, function (request, reply) {
  const response = request.body.toLowerCase();
  if (response.includes("fuck")) {
    reply.status(403).send("unresolved");
  } else {
    reply.status(200).send(response);
  }
})

// 3 Должен иметь роут /user/:id(GET) и должен вернуть объект с этим id,
// если его нет(например id нет в объекте) тогда статус 400 и шлем строку User not exist


fastify.get('/user/:id', function (request, reply) {
  const {id} = request.params;
  if (id in users) {
    reply.send(users[id])
  } else {
    reply.status(400).send("User not exist");
  }
})


//Должен иметь роут /users(GET) и они могут принять несколько query params,
// которые называются filter и value. В фильтр ми отправляем строку, поле по которому
// мы будем фильтровать, а в value значение и роут должен вернуть массив объектов
// соответвствующих этому фильтру. Если мы не передаем query params то тогда отправляем массив
// объектов(без id, только те объекты что внутри)

fastify.get('/users', {
  schema: {
    querystring: {
      name: {type: 'string'}
    }
  }
}, function (request, reply) {
  const {filter, value} = request.query;
  const result = Object.values(users);

  if (filter && value) {
    const filteredUsers = result.filter((user) => {
        return user[filter] === value
      }
    )
    reply.send(filteredUsers);
  } else {
    reply.send(result);
  }
});
