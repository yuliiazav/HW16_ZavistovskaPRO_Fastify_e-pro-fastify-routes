import Fastify from 'fastify';

const fastify = Fastify({
  logger: true,
});

fastify.get('/hello', (request, reply) => {
  return reply.send('world');
});

export default fastify;
