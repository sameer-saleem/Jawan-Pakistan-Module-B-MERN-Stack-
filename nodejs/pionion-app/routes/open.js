const express = require('express');
const routes = express.Router();
const { addOpen, getOpen } = require('./controller/opinion');

routes.post('/', addOpen);

routes.get('/', getOpen);

module.exports = routes;