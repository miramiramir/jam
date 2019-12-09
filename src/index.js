const { dumpAsciiLogo } = require('./util');

const Web = require('./web');
const Config = require('./config');
const Updater = require('./Updater');
const logger = require('./logger');
const Process = require('./process');
const path = require('path');

dumpAsciiLogo();


/**
 * Config
 */
Config.load();


/**
 * Process
 */
const process = new Process(path.join(__dirname, '.', 'Jam.js'));

/**
 * Web server object
 */
const { port } = Config.get('web');

/**
 * Spawn
 */
Updater.checkForNewRelease()
  .then(() => Web(port))
  .then(() => logger.info('Web Server Initialized...'))
  .then(() => process.spawn())
  .then(() => logger.info('Spawning Jam...'))
  .catch(error => logger.error(`Failed Initializing! Reason: ${error.message}`));
