const execFile = require('child_process').execFile;

const ERR = 'media/dialog-error.ogg';
const WARN = 'media/dialog-information.ogg';
const INFO = 'media/dialog-warning.ogg';

class Sound {
  constructor() {
    this.exec = execFile;
  }

  info() {
    return this._run(INFO);
  }

  warning() {
    return this._run(WARN);
  }

  error() {
    return this._run(ERR);
  }

  _run(...args) {
    return new Promise((resolve, reject) => {
      this.exec('paplay', args, {cwd: './'}, (error, stdOut, stdErr) => {
        if (error) {
          return reject(error);
        }

        return resolve({success: true, args, stdOut, stdErr});
      });
    });
  }
}

module.exports = new Sound();
