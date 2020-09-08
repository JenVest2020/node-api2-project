const express = require('express');
const server = express();
const postsRouter = require('./routers/postsRouter.js');

server.use(express.json());
server.use('/api/posts', postsRouter);

const Posts = require('./data/db.js');

module.exports = server;
