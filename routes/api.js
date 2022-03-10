'use strict';

const { redundancy } = require('../components/british-to-american-only-spelling.js');
const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      console.log(req.body);
      let translation;

      if (!req.body.locale || req.body.text == '') {
        res.json({'error': 'Required field(s) missing'})
      } else if (!req.body.text) {
        res.json({'error': 'No text to translate'})
      } else if (req.body.locale != "american-to-british" && req.body.locale != "british-to-american") {
        res.json({'error': 'Invalid value for locale field'});
      } else if (req.body.text && req.body.locale) {
        if (req.body.locale == "american-to-british") {
          translation = translator.americanToBritish(req.body.text);
        }
  
        if (req.body.locale == "british-to-american") {
          translation = translator.britishToAmerican(req.body.text);
        }
  
        console.log(translation);
  
        if (translation == req.body.text) {
          return (res.json({'submitted': req.body.text, 'translation': 'Everything looks good to me!'}))
        } else {
          res.json({'submitted': req.body.text, 'translation': translation})
        }
      }
    });
};
