import Fastify from 'fastify';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('fastify-cookie'));
fastify.register(import('fastify-multipart'), {
  addToBody: true,
});
fastify.register(import('fastify-cors'));

fastify.get('/hello', (request, reply) => {
  return reply.send('world');
});

export default fastify;
