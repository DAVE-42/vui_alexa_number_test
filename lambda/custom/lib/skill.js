module.exports = skill;

const Alexa = require('alexa-sdk');
const baseHandlers = require('./handlers/base');
const languageStrings = {
  'de-DE': require('./languageStrings/de-DE.json')
};

/**
 * @param {object} event
 * @param {object} context
 */
function skill (event, context) {
  var alexa = Alexa.handler(event, context);

  alexa.resources = languageStrings;
  alexa.registerHandlers(baseHandlers);
  alexa.execute();
}
