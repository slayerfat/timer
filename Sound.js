const execFile = require('child_process').execFile;

// The location of the default sounds.
const ERR = 'media/dialog-error.ogg';
const WARN = 'media/dialog-information.ogg';
const INFO = 'media/dialog-warning.ogg';

class Sound {

  /**
   * We need to know which command to run.
   *
   * @param {string} command
   */
  constructor(command) {
    this.command = command;
    this.exec = execFile;
  }

  /**
   * Makes an info sound.
   *
   * @returns {Promise}
   */
  info() {
    return this._run(INFO);
  }

  /**
   * Makes an warning sound.
   * @returns {Promise}
   */
  warning() {
    return this._run(WARN);
  }

  /**
   * Makes an error sound.
   *
   * @returns {Promise}
   */
  error() {
    return this._run(ERR);
  }

  /**
   * Runs the child process with the default command.
   *
   * @param {Array | string} args
   * @returns {Promise}
   * @private
   */
  _run(...args) {
    return new Promise((resolve, reject) => {
      this.exec(this.command, args, {cwd: './'}, error => {
        if (error) {
          return reject(error);
        }

        return resolve();
      });
    });
  }
}

module.exports = Sound;
