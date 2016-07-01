const chalk = require('chalk');

const MIN = 6e4;
const SEC = 1e3;

class Timer {

  /**
   * We need to know the sound object to use.
   *
   * @param {Object} options
   * @param {Sound} options.sound
   * @param {Object} options.progress
   * @param {Quote} options.quote
   * @param {number} options.end
   * @param {number=} options.start
   */
  constructor(options) {
    const {progress, end, quote, start = 0} = options;
    this.sound = options.sound;
    this.progress = progress;
    this.quote = quote;
    this.startTime = start;
    this.goal = end;
    this.interval = SEC;
    this.intFunc = null;
    this._misc();
  }

  get minsLeft() {
    return this.startTime / (this.interval * 60);
  }

  get msg() {
    if (this.minsLeft === 1) {
      return `${Timer.time()} Ha pasado ${Math.ceil(this.minsLeft)} minuto.`;
    }

    return `${Timer.time()} Han pasado ${Math.ceil(this.minsLeft)} minutos.`;
  }

  get objective() {
    if (this.minsLeft === 1) {
      return `${Timer.time()} El objetivo es es de ${this.goal / (60 * this.interval)} minuto.`;
    }

    return `${Timer.time()} El objetivo es es de ${this.goal / (60 * this.interval)} minutos.`;
  }

  logObjective() {
    console.log(chalk.bgGreen(this.objective));
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
    const mins = (this.goal - this.startTime) / (60 * this.interval);
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
    this._tryToQuote();
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
    this.progress.tick(this.interval, {'msg': msg});
  }

  /**
   * Will try to log a random quote.
   *
   * @private
   */
  _tryToQuote() {
    const i = Math.random() * 0.6;
    if (i >= 0.5) {
      console.log(chalk.blue(`\n${this.quote.random()}\n`));
    }
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
