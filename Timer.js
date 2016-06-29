require('log-timestamp');
const chalk = require('chalk');
const sound = require('./Sound.js');

const MIN = 6e4;
const SEC = 1e3;

class Timer {
  constructor() {
    this.timer = 0;
    this.goal = 18e5;
    this.interval = SEC;
    this.intFunc = null;
    this.misc();
  }

  start() {
    this.intFunc = setInterval(() => {
      this.timer += this.interval;

      if (this.timer % MIN === 0) {
        const mins = this.timer / (this.interval * 60);
        console.log(chalk.bgWhite.dim(`Han pasado ${Math.ceil(mins)} minutos.`));
      } else if (this.timer % (MIN * 10) === 0) {
        const mins = this.timer / (this.interval * 60);
        console.log(chalk.bgWhite.bold(`Han pasado ${Math.ceil(mins)} minutos.`));
        sound.warning();
      } else if (this.timer >= this.goal) {
        console.log(chalk.bold.underline('OBJETIVO LOGRADO!'));
        sound.info();
        this.stop();
      }
    }, this.interval);
  }

  stop() {
    clearInterval(this.intFunc);
  }

  exit() {
    const mins = (this.goal - this.timer) / (60 * this.interval);
    const msg = `Faltaron ${Math.ceil(mins)} minutos.`;
    sound.error();

    console.log(chalk.red.underline.bold(msg));

    process.exit();
  }

  misc() {
    console.log(chalk.bgGreen(`Objetivo es: ${this.goal / (60 * this.interval)} minutos.`));

    process.on('SIGINT', this.exit.bind(this))
    .on('SIGTERM', this.exit.bind(this));
  }
}

module.exports = new Timer();
