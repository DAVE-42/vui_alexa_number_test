const emit = require('./../emit');

/**
 * Welcome Handler
 */
const welcome = function () {
  emit.call(this, 'ask', this.t('WELCOME'), this.t('REPROMPT'));
};

/**
 * Quit Handler
 */
const quit = function () {
  emit.call(this, 'tell', this.t('QUIT'));
};

/**
 * Help Handler
 */
const help = function () {
  emit.call(this, 'ask', this.t('HELP'));
}

/**
 * Number detection via DAVE42 custom method
 */
const customNumberDetection = function () {
  let numbers = getNumberFromRequest(this.event.request);
  emit.call(this,
        'ask',
        this.t('NUMBER_RESPONSE', numbers.join(''), numbers.join(' '))
  );
};

/**
 * Number detection via Amazon.Number
 */
const amazonNumberDetection = function () {
  let numbers = getAmazonNumberFromRequest(this.event.request);
  emit.call(this,
        'ask',
        this.t('AMAZON_NUMBER') + ' ' + this.t('NUMBER_RESPONSE', numbers.join(''), numbers.join(' '))
  );
}

/**
 * Get numbers from request that uses AMAZON.NUMBER as slot type
 *
 * @param request
 * @returns {Array}
 */
const getAmazonNumberFromRequest = function (request) {
    let numberArray = [];
    let slotIndexMap = {
        'NUM_TYPEB_A' : 0,
        'NUM_TYPEB_B' : 1,
        'NUM_TYPEB_C' : 2,
        'NUM_TYPEB_D' : 3,
        'NUM_TYPEB_E' : 4,
        'NUM_TYPEB_F' : 5,
        'NUM_TYPEB_G' : 6,
        'NUM_TYPEB_H' : 7
    };

    for (let slotName in slotIndexMap) {
        if (!slotIndexMap.hasOwnProperty(slotName)) {
            continue;
        }
        let slot = request.intent.slots[slotName];
        let slotIndex = -1;
        if (!slotIndexMap.hasOwnProperty(slotName)) {
            continue;
        }
        slotIndex = slotIndexMap[slotName];
        console.log(slot);
        if (slot.resolutions) {
          console.log(slot.resolutions.resolutionsPerAuthority);
        }
        numberArray[slotIndex] = slot.value;
    }

    return numberArray;
}

/**
 * The intent has a list of number slots. Here, we iterate through the slots and
 * and concatenate each number to arrive at a long numerical number
 *
 * @param request
 * @returns {Array}
 */
const getNumberFromRequest = function (request) {
    let numberArray = [];
    let slotIndexMap = {
        'NUM_A' : 0,
        'NUM_B' : 1,
        'NUM_C' : 2,
        'NUM_D' : 3,
        'NUM_E' : 4,
        'NUM_F' : 5,
        'NUM_G' : 6,
        'NUM_H' : 7
    };

    for (let slotName in slotIndexMap) {
        if (!slotIndexMap.hasOwnProperty(slotName)) {
            continue;
        }
        let slot = request.intent.slots[slotName];
        let slotIndex = -1;
        if (!slotIndexMap.hasOwnProperty(slotName)) {
            continue;
        }
        slotIndex = slotIndexMap[slotName];
        numberArray[slotIndex] = getValueIdFromSlot(slot);
    }

    return numberArray;
};

/**
 * get value of a slot using the resolutions
 *
 * @param slot
 * @returns {string}
 */
const getValueIdFromSlot = function (slot) {
  if (slot.hasOwnProperty('resolutions')
        && slot.resolutions.hasOwnProperty('resolutionsPerAuthority')
        && slot.resolutions.resolutionsPerAuthority[0]
        && slot.resolutions.resolutionsPerAuthority[0].values
  ) {
      return slot.resolutions.resolutionsPerAuthority[0].values[0].value.id;
  }
  return '';
}

module.exports = {
  'Unhandled': welcome,
  'LaunchRequest': welcome,
  'AMAZON.StartOverIntent': welcome,
  'StartIntent': welcome,
  'NumberTypeOneIntent': customNumberDetection,
  'NumberTypeTwoIntent': amazonNumberDetection,
  'AMAZON.StopIntent': quit,
  'AMAZON.CancelIntent': quit,
  'AMAZON.HelpIntent': help
};
