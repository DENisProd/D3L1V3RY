import fastify from 'fastify';
import cors from "@fastify/cors"
import initSwagger from './swagger/swagger';
import setupRoutes from './routes';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { SERVER_PORT } from './config';

export const ORIGIN = "*"

const port = +(SERVER_PORT || 5000)
const server = fastify({ logger: false, bodyLimit: 30 * 1024 * 1024 }).withTypeProvider<TypeBoxTypeProvider>()

server.register(cors, {
  origin: ORIGIN,
});
initSwagger(server);
setupRoutes(server);

server.listen({ port }, (err, addr) => {
  if (err) throw err;
  console.log(`Start server...\n${addr}`);
});

