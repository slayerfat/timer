class Quote {
  constructor() {
    this.messages = [
      'Vas bien!',
      'Recuerda por que lo haces!',
      'Debes seguir!',
      'No pierdas el tiempo!',
      'Sigue asi!',
      'Falta poco',
      'Continua!',
      'No te defraudes!',
      'Hazlo por ellos!'
    ];
  }

  random() {
    return this.messages[Math.floor(Math.random() * this.messages.length)];
  }
}

module.exports = Quote;
