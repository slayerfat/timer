require('log-timestamp');
const chalk = require('chalk');

const HALF = 18e5;
const MIN = 6e4;
const SEC = 1e3;

class Timer {

  /**
   * We need to know the sound object to use.
   *
   * @param {Object} sound
   * @param {number} start
   * @param {number} end
   */
  constructor({sound, start = 0, end = HALF}) {
    this.sound = sound;
    this.startTime = start;
    this.goal = end;
    this.interval = SEC;
    this.intFunc = null;
    this._misc();
  }

  /**
   * Starts the interval, defaults to this.interval.
   */
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

  /**
   * When the user ends the process, we can
   * tell how many minutes were left.
   */
  _exit() {
    const mins = (this.goal - this.startTime) / (60 * this.interval);
    const msg = `Faltaron ${Math.ceil(mins)} minutos.`;
    this.sound.error().catch(err => {
      console.log(chalk.red(err));
    });

    console.log(chalk.red.underline.bold(msg));

    process.exit();
  }

  _misc() {
    console.log(chalk.bgGreen(`Objetivo es: ${this.goal / (60 * this.interval)} minutos.`));

    process.on('SIGINT', this._exit.bind(this))
      .on('SIGTERM', this._exit.bind(this));
  }

  _everyMin() {
    const mins = this.startTime / (this.interval * 60);
    console.log(chalk.bgWhite(`Han pasado ${Math.ceil(mins)} minutos.`));
  }

  _everyTMin() {
    const mins = this.startTime / (this.interval * 60);
    console.log(chalk.bgWhite.bold(`Han pasado ${Math.ceil(mins)} minutos.`));
    this.sound.warning().catch(err => {
      console.log(chalk.red(err));
    });
  }

  _done() {
    console.log(chalk.bold.underline('OBJETIVO LOGRADO!'));
    this.sound.info().catch(err => {
      console.log(chalk.red(err));
    });
    this.stop();
  }
}

module.exports = Timer;
