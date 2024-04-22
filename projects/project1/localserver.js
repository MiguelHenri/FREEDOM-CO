/* Using LOCAL Database !!!*/

import { fastify } from 'fastify';
import { DatabaseMemory } from './database-memory.js'

const server = fastify();

const database = new DatabaseMemory();

// POST http://localhost:3333/videos
server.post('/videos', (request, reply) => {
    const { title, description, duration } = request.body;

    database.create({
        title,
        description,
        duration,
    });

    return reply.status(201).send();
});

// GET http://localhost:3333/videos
server.get('/videos', (request) => {
    const search = request.query.search;

    const videos = database.list(search);

    return videos;
});

// PUT http://localhost:3333/videos/<videoid>
server.put('/videos/:id', (request, reply) => {
    const id = request.params.id;
    const { title, description, duration } = request.body;

    database.update(id, {
        title,
        description,
        duration,
    });

    return reply.status(204).send();
});

// DELETE http://localhost:3333/videos/<videoid>
server.delete('/videos/:id', (request, reply) => {
    const id = request.params.id;

    database.delete(id);

    return reply.status(204).send();
});

server.listen({
    port: 3333,
});

