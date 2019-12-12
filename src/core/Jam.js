const Server = require('../network/Server');
const logger = require('../logger');
const Config = require('../config');
const Plugin = require('../plugin');

let server;

/**
 * Config
 */
Config.load()
  .then(() => {
    global.Config = Config;
    global.Plugin = Plugin;
  })
  .then(() => {
    server = Server.spawn();
  })
  .then(() => logger.info('Successfully initialized!'))
  .catch(error => logger.error(`Failed to spawn servers.. Reason: ${error.message}`));
