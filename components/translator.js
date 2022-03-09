const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');
const britishToAmericanOnly = require('./british-to-american-only-spelling.js');
const britishToAmericanSpelling = require('./british-to-american-spelling.js');
const britishToAmericanTitles = require('./british-to-american-titles.js');
const americanToBritishRegex = /[0-9][0-9]:[0-9][0-9]/
const britishToAmericanRegex = /[0-9][0-9]\.[0-9][0-9]/
const letterRegex = /[a-z]/

class Translator {

    americanToBritish (text) {
        let textArr = text.split(" ");

        for (let i = 0; i < textArr.length; i++) {
            if (americanOnly[textArr[i]]) {
                textArr[i] = '<span class="highlight">' + americanOnly[textArr[i]] + '</span>';
            } else if (americanToBritishSpelling[textArr[i]]) {
                textArr[i] = '<span class="highlight">' + americanToBritishSpelling[textArr[i]] + '</span>';
            } else if (americanToBritishTitles[textArr[i]]) {
                textArr[i] = '<span class="highlight">' + americanToBritishTitles[textArr[i]] + '</span>'
            } else if (americanToBritishRegex.test(textArr[i])) {
                textArr[i] = '<span class="highlight">' + textArr[i][0] + textArr[i][1] + '.' + textArr[i][3] + textArr[i][4] + '</span>';
            }
        }

        //Turn the first word into uppercase
        if (letterRegex.test(textArr[0])){
            let splitStr = textArr[0].split("");
            splitStr[0] = splitStr[0].toUpperCase();
            splitStr = splitStr.join("");
            textArr[0] = splitStr;
        }
 

        return textArr.join(" ");
    }

    britishToAmerican (text) {
        let lowerCaseText = text.toLowerCase();

        let textArr = lowerCaseText.split(" ");

        for (let i = 0; i < textArr.length; i++) {
            if (britishOnly[textArr[i]]) {
                textArr[i] = '<span class="highlight">' + britishOnly[textArr[i]] + '</span>';
            } else if (britishToAmericanOnly[textArr[i]]) {
                textArr[i] = '<span class="highlight">' + britishToAmericanOnly[textArr[i]] + '</span>';
            } else if (britishToAmericanSpelling[textArr[i]]) {
                textArr[i] = '<span class="highlight">' + britishToAmericanSpelling[textArr[i]] + '</span>';
            } else if (britishToAmericanTitles[textArr[i]]) {
                textArr[i] = '<span class="highlight">' + britishToAmericanTitles[textArr[i]] + '</span>';
            } else if (britishToAmericanRegex.test(textArr[i])) {
                textArr[i] = '<span class="highlight">' + textArr[i][0] + textArr[i][1] + ':' + textArr[i][3] + textArr[i][4] + '</span>';
            }
        }

        //Turn the first word into uppercase
        if (letterRegex.test(textArr[0])){
            let splitStr = textArr[0].split("");
            splitStr[0] = splitStr[0].toUpperCase();
            splitStr = splitStr.join("");
            textArr[0] = splitStr;
        }

        


        return textArr.join(" ");
    }

}

module.exports = Translator;