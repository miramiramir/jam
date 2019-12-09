const { EventEmitter } = require('events');
const { createServer } = require('net');
const { EVENTS } = require('../util/Constants');
const PluginManager = require('../plugin/PluginManager');
const { PromiseSocket } = require('promise-socket');
const logger = require('../logger');
const Client = require('./Client');

class TCPServer extends EventEmitter {
  constructor(server) {
    super();

    Object.assign(this, server);

    /**
     * Server connection
     * @type {?net.Socket}
     * @private
     */
    this._server = null;

    /**
     * Plugin manager
     * @type {PluginManager}
     * @public
     */
    this.plugins = new PluginManager(this);
    this.plugins.loadAll();

    /**
     * Handles all connected connections
     * @type {Map<Client>}
     * @public
     */
    this.connections = new Set();
  }

  get logger() {
    return logger;
  }

  /**
   * Spawns the server and gets the information from the configuration file
   * @param {Array} servers Servers to spawn
   * @returns {TCPServer}
   * @static
   */
  static spawn() {
    const server = Config.get('jam');
    const tcpServer = new TCPServer(server);
    return tcpServer.listen();
  }

  /**
   * Create socket and begin listening for new connections
   * @returns {Promise<void>}
   * @public
   */
  listen() {
    return new Promise((resolve, reject) => {
      if (this._server) reject(new Error('The server has already been instantiated.'));

      this._server = createServer(socket => this._onConnection(socket))
        .once('listening', () => resolve())
        .once('error', error => reject(error));

      this._server.listen(this.port);
    });
  }

  /**
   * Handles new incoming connections
   * @param {net.Socket} socket Connection socket
   */
  async _onConnection(socket) {
    socket = new PromiseSocket(socket);

    const client = new Client(this, socket);
    await client.connect();

    this.connections.add(client);
    this.emit(EVENTS.NEW_CONNECTION, client);
  }

  /**
   * Removes the client from the connections map
   * @param {Client} client Client to remove
   */
  removeConnection(client) {
    if (this.connections.has(client)) {
      this.connections.delete(client);
      this.emit(EVENTS.CONNECTION_REMOVED, client);
    }
  }
}

module.exports = TCPServer;
