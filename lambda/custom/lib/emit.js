module.exports = emit;

/**
 * @param {string} type
 * @param {string} message
 * @param {string} reprompt
 */
function emit (type, message, reprompt) {
  this.emit(':' + type, message, reprompt);
}
