const express = require('express');
const path = require('path');
const app = express();

const MessagesController = require('../web/controllers/messages');

const router = express.Router();

const controllers = [
  new MessagesController(router)
];

app.use(express.json());
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));
app.use('/', controllers);

module.exports = app;