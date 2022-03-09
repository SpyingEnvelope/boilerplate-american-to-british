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

            if (americanOnly[textArr[i].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + americanOnly[textArr[i].toLowerCase()] + '</span>';
            } else if (americanToBritishSpelling[textArr[i].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + americanToBritishSpelling[textArr[i].toLowerCase()] + '</span>';
            } else if (americanToBritishTitles[textArr[i].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + americanToBritishTitles[textArr[i].toLowerCase()] + '</span>'
            } else if (americanToBritishRegex.test(textArr[i])) {
                textArr[i] = '<span class="highlight">' + textArr[i][0] + textArr[i][1] + '.' + textArr[i][3] + textArr[i][4] + '</span>';
            } else if (i == textArr.length - 1) {
                continue;
            } else if (americanOnly[textArr[i].toLowerCase() + ' ' + textArr[i + 1].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + americanOnly[textArr[i].toLowerCase() + ' ' + textArr[i + 1].toLowerCase()] + '</span>';
                textArr.splice(i + 1, 1);
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
        let textArr = text.split(" ");

        for (let i = 0; i < textArr.length; i++) {
            if (britishOnly[textArr[i].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + britishOnly[textArr[i].toLowerCase()] + '</span>';
            } else if (britishToAmericanOnly[textArr[i].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + britishToAmericanOnly[textArr[i].toLowerCase()] + '</span>';
            } else if (britishToAmericanSpelling[textArr[i].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + britishToAmericanSpelling[textArr[i].toLowerCase()] + '</span>';
            } else if (britishToAmericanTitles[textArr[i].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + britishToAmericanTitles[textArr[i].toLowerCase()] + '</span>';
            } else if (britishToAmericanRegex.test(textArr[i])) {
                textArr[i] = '<span class="highlight">' + textArr[i][0] + textArr[i][1] + ':' + textArr[i][3] + textArr[i][4] + '</span>';
            } else if (i == textArr.length - 1) {
                continue;
            } else if (britishOnly[textArr[i].toLowerCase() + ' ' + textArr[i + 1].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + britishOnly[textArr[i].toLowerCase() + ' ' + textArr[i + 1].toLowerCase()] + '</span>';
                textArr.splice(i + 1, 1);
            } else if (britishToAmericanOnly[textArr[i].toLowerCase() + ' ' + textArr[i + 1].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + britishToAmericanOnly[textArr[i].toLowerCase() + ' ' + textArr[i + 1].toLowerCase()] + '</span>';
                textArr.splice(i + 1, 1);
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