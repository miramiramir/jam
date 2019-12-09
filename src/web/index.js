const express = require('express');
const path = require('path');

/**
 * Routes
 */
const SiteRouter = require('./routes/Site');

/**
 * Express instance
 */
const app = express();

/**
 * Settings
 */
app.set('views', path.join(__dirname, '.', 'resources/views'));
app.set('view engine', 'pug');

/**
 * Middleware
 */
app.use(express.static(path.join(__dirname, '.', 'public')));

/**
 * Routers
 */
app.use('/', SiteRouter);

/**
 * Express listen
 * @param {string} port Server listen port
 * @returns {Promise<void>}
 */
module.exports = port => new Promise(resolve => app.listen(port, () => resolve()));
