'use strict';

const chalk = require('chalk');

class Timer {

  /**
   * We need to know the sound object to use.
   *
   * @param {Object} options
   * @param {Sound} options.sound
   * @param {Object} options.progress
   * @param {Quote} options.quote
   * @param {Time} options.time
   */
  constructor(options) {
    const {progress, quote, time} = options;
    this.sound = options.sound;
    this.progress = progress;
    this.quoter = quote;
    this.time = time;
    this.intFunc = null;
    this._misc();
  }

  get msg() {
    if (this.time.accumulatedMins === 1) {
      return `${Timer.time()} Ha pasado ${Math.ceil(this.time.accumulatedMins)} minuto.`;
    }

    return `${Timer.time()} Han pasado ${Math.ceil(this.time.accumulatedMins)} minutos.`;
  }

  get objective() {
    if (this.time.accumulatedMins === 1) {
      return `${Timer.time()} El objetivo es es de ${this.time.goal / (60 * this.time.interval)} minuto.`;
    }

    return `${Timer.time()} El objetivo es es de ${this.time.goal / (60 * this.time.interval)} minutos.`;
  }

  /**
   * Returns a quote or empty string.
   *
   * @returns {string}
   * @private
   */
  get _quote() {
    return this._tryToQuote();
  }

  logObjective() {
    console.log(chalk.bgGreen(this.objective));
  }

  /**
   * Starts the interval, defaults to this.time.interval.
   */
  start() {
    this.intFunc = setInterval(() => {
      this.time.start += this.time.interval;

      if (this.time.start % this.time.divisor === 0) {
        this._everyMin();
      } else if (this.time.start % (this.time.divisor * 10) === 0) {
        this._everyTMin();
      }

      if (this.time.start >= this.time.goal) {
        this._done();
      }
    }, this.time.interval);
  }

  /**
   * Stops the internal interval.
   */
  stop() {
    clearInterval(this.intFunc);
  }

  /**
   * When the user ends the process, we can
   * tell how many minutes were left.
   */
  _exit() {
    const mins = (this.time.goal - this.time.start) / (60 * this.time.interval);
    const msg = `\n${Timer.time()} Faltaron ${Math.ceil(mins)} minutos.\n`;

    this.sound.error().catch(Timer._handleError);
    console.log(chalk.red.underline.bold(msg));

    process.exit();
  }

  /**
   * Just the starting message and node sigterm hook.
   *
   * @private
   */
  _misc() {
    process.on('SIGINT', this._exit.bind(this))
      .on('SIGTERM', this._exit.bind(this));
  }

  /**
   * Every time this is called a new progress bar tick is added.
   *
   * @private
   */
  _everyMin() {
    this._newBarTick();
  }

  /**
   * Every time this is called a new progress bar
   * tick is added and also plays a sound.
   *
   * @private
   */
  _everyTMin() {
    this._everyMin();
    this.sound.warning().catch(Timer._handleError);
  }

  _done() {
    console.log(chalk.bold.underline(`\n${Timer.time()} OBJETIVO LOGRADO!\n`));
    this.sound.info().catch(Timer._handleError);
    this.stop();
  }

  /**
   * Sets the progress bar with a message.
   *
   * @param {string=} msg optional message.
   * @private
   */
  _newBarTick(msg) {
    msg = msg || this.msg;
    this.progress.tick(this.time.interval, {'msg': `${msg} ${this._quote}`});
  }

  /**
   * Will try to log a random quote.
   *
   * @param {boolean=} logIt
   * @private
   */
  _tryToQuote(logIt) {
    let msg = '';
    if (Math.random() * 0.6 >= 0.5) {
      msg = this.quoter.random();

      if (logIt) {
        console.log(chalk.blue(`\n${msg}\n`));
      }
    }

    return msg;
  }

  /**
   * For now it just prints the error.
   *
   * @param err
   * @private
   */
  static _handleError(err) {
    console.log(chalk.red(err));
  }

  /**
   * Gets the current formatted time.
   *
   * @returns {string} returns in [HH:mm:ss]
   */
  static time() {
    const date = new Date();
    let test = function (element) {
      return element < 10 ? `0${element}` : element;
    };

    const hour = test(date.getHours());
    const mins = test(date.getMinutes());
    const secs = test(date.getSeconds());

    return `[${hour}:${mins}:${secs}]`;
  }
}

module.exports = Timer;
