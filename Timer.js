require('log-timestamp');
const chalk = require('chalk');
const sound = require('./Sound.js');

const MIN = 6e4;
const SEC = 1e3;

class Timer {
  constructor() {
    this.startTime = 0;
    this.goal = 18e5;
    this.interval = SEC;
    this.intFunc = null;
    this._misc();
  }

  start() {
    this.intFunc = setInterval(() => {
      this.startTime += this.interval;

      if (this.startTime % MIN === 0) {
        this._everyMin();
      } else if (this.startTime % (MIN * 10) === 0) {
        this._everyTMin();
      } else if (this.startTime >= this.goal) {
        this._done();
      }
    }, this.interval);
  }

  stop() {
    clearInterval(this.intFunc);
  }

  exit() {
    const mins = (this.goal - this.startTime) / (60 * this.interval);
    const msg = `Faltaron ${Math.ceil(mins)} minutos.`;
    sound.error().catch(err => {
      console.log(chalk.red(err));
    });

    console.log(chalk.red.underline.bold(msg));

    process.exit();
  }

  _misc() {
    console.log(chalk.bgGreen(`Objetivo es: ${this.goal / (60 * this.interval)} minutos.`));

    process.on('SIGINT', this.exit.bind(this))
      .on('SIGTERM', this.exit.bind(this));
  }

  _everyMin() {
    const mins = this.startTime / (this.interval * 60);
    console.log(chalk.bgWhite(`Han pasado ${Math.ceil(mins)} minutos.`));
  }

  _everyTMin() {
    const mins = this.startTime / (this.interval * 60);
    console.log(chalk.bgWhite.bold(`Han pasado ${Math.ceil(mins)} minutos.`));
    sound.warning().catch(err => {
      console.log(chalk.red(err));
    });
  }

  _done() {
    console.log(chalk.bold.underline('OBJETIVO LOGRADO!'));
    sound.info().catch(err => {
      console.log(chalk.red(err));
    });
    this.stop();
  }
}

module.exports = new Timer();
