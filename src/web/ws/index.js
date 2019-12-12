const io = require('socket.io');
const logger = require('../../logger');

const PORT = 3000;

class WebSocketServer {
  constructor(process) {
    this._process = process;
    this._server = null;
  }

  /**
   * Begins listening for websocket connections
   * @returns {Promise<void>}
   * @public
   */
  async serve() {
    await new Promise(resolve => {
      this._server = io.listen(3000);

      logger.info(`Jam web socket server listening on ::${PORT}`);
      resolve();
    });

    this._process.on('message', this._onJamProcess.bind(this));
    this._server.on('connection', this._onConnection.bind(this));
  }

  /**
   * Handles Jam process events
   * @param {Object} data The incoming data
   * @private
   */
  _onJamProcess(data) {
    switch (data.type) {
      case 'packet':
        this._server.emit('packet', data);
        break;
    }
  }

  /**
   * Handles new incoming websocket connections
   * @param {SocketIO.Socket} socket The socket connection
   * @private
   */
  _onConnection(socket) {
    socket.on('packet', this._onPacket.bind(this));
  }

  /**
   * Handles the socket packet data
   * @param {Object} packet The Packet to handle
   * @private
   */
  _onPacket(packet) {
    const messageType = packet.type;
    const type = packet.packetType;
    const packetObject = packet.packet;

    this._process.send({ messageType, type, packet: packetObject });
  }
}

module.exports = WebSocketServer;

