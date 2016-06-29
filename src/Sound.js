class Sound {

  /**
   * We need to know which command to run.
   *
   * @param {string} command
   * @param {string} execFile
   */
  constructor({command, execFile}) {
    this.command = command;
    this.exec = execFile;

    // The location of the default sounds.
    this._ERR = 'media/dialog-error.ogg';
    this._WARN = 'media/dialog-information.ogg';
    this._INFO = 'media/dialog-warning.ogg';
  }

  /**
   * Makes an info sound.
   *
   * @returns {Promise}
   */
  info() {
    return this._run(this._INFO);
  }

  /**
   * Makes an warning sound.
   * @returns {Promise}
   */
  warning() {
    return this._run(this._WARN);
  }

  /**
   * Makes an error sound.
   *
   * @returns {Promise}
   */
  error() {
    return this._run(this._ERR);
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
