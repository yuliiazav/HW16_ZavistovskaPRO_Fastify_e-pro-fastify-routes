import Fastify from 'fastify';

import { users } from './users';
import { use } from 'bcrypt/promises';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

export default fastify;
