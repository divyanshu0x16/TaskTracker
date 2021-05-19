const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8000;
const express = require('express');
const path = require('path');

server.use(middlewares);
server.use(router);

server.listen(port);