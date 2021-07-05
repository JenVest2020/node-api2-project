const express = require('express');
const postRouter = require('./routers/postRouter.js');
const comRouter = require('./commentsRouter.js');

const server = express();

server.use(express.json());
server.use('/api/posts', router)



module.exports = server;