// import { createServer } from 'node:http';

// const server = createServer((request, response) => {
//   response.write('Hello world !');

//   return response.end();
// });

// server.listen(3333);

import { fastify } from 'fastify';
// import { DatabaseMemory } from './database-memory.js';
import { PostgresDabatase } from './database-postgres.js';

const server = fastify();

const database = new PostgresDabatase();

server.post('/videos', (request, reply) => {
  const { title, description, duration } = request.body;

  const newVideo = database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send(newVideo);
});

server.get('/videos', (request, reply) => {
  const searchOptions = request.query.search;
  const videos = database.list(searchOptions);

  return videos;
});

server.put('/videos/:id', (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  const video = database.update(videoId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});

server.delete('/videos/:id', (request, reply) => {
  const videoId = request.params.id;

  database.delete(videoId);

  return reply.status(204).send();
});

server.listen({
  port: 3333,
});
