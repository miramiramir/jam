const chalk = require('chalk');

const { version } = require('../../package.json');

class Util {
  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
  }

  /**
   * Prints moon ascii art to the console
   * @static
   */
  static dumpAsciiLogo() {
    // eslint-disable-next-line no-console
    console.log(chalk.whiteBright([
      '',
      '    -:://::-     ',
      '    -//++++//-    ',
      '   `:/++++++/:    ',
      '  `::-            ',
      '  .ooo+-    ./o`  ',
      '   oooooo+/+ooo   ',
      '   /oooooooooo/   ',
      '   :oooooooooo-   ',
      '    `-::::::.` ',
      '',
    ].join('\n')), `\n  ${chalk.whiteBright(`Version v${version}`)}\n`);
  }
}

module.exports = Util;

