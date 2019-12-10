const { notify } = require('../../src/util');

class Notify extends Plugin {
  constructor(server) {
    super(server, {
      name: 'notify',
      author: 'zane',
      hooks: [
        {
          packet: 'ti',
          type: 'remote',
          execute: ({ client, packet }) => this.onTrade(client, packet),
        },
      ],
    });
  }

  /**
   * Called upon trade requests
   * @param {Client} client The client instance
   * @param {XtPacket} packet The packet to handle
   * @public
   */
  onTrade(client, packet) {
    const username = packet.object[5];
    const type = Number(packet.object[4]);

    if (type === 0) {
      notify({
        title: 'Trade Request',
        message: `Incoming trade request from ${username}`,
        wait: true,
      });
    }
  }
}

module.exports = Notify;
