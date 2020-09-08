const express = require('express');
const server = express();
const postsRouter = require('./routers/postsRouter.js');

server.use(express.json());
server.use('/api/posts', postsRouter);


module.exports = server;
