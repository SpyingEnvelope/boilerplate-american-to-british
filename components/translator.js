const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');
const britishToAmericanOnly = require('./british-to-american-only-spelling.js');
const britishToAmericanSpelling = require('./british-to-american-spelling.js');
const britishToAmericanTitles = require('./british-to-american-titles.js');
const americanToBritishRegex = /[0-9][0-9]:[0-9][0-9]/
const britishToAmericanRegex = /[0-9][0-9]/
const digitRegex = /[0-9]/
const letterRegex = /[a-z]/
const splitRegex = /\s|(?=\.)|(?=\?)|(?=\,)|(?=\!)/
const specialRegex = /^\.|\,|\?|\!$/

class Translator {

    americanToBritish (text) {
        let textArr = text.split(splitRegex);

        
        for (let i = 0; i < textArr.length; i++) {
            if (i + 3 <= textArr.length && americanOnly[textArr[i].toLowerCase() + ' ' + textArr[i + 1].toLowerCase() + ' ' + textArr[i + 2].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + americanOnly[textArr[i].toLowerCase() + ' ' + textArr[i + 1].toLowerCase() + ' ' + textArr[i + 2].toLowerCase()] + '</span>';
                textArr.splice(i + 1, 2);
            } else if (i + 2 <= textArr.length && americanOnly[textArr[i].toLowerCase() + ' ' + textArr[i + 1].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + americanOnly[textArr[i].toLowerCase() + ' ' + textArr[i + 1].toLowerCase()] + '</span>';
                textArr.splice(i + 1, 1);
            } else if (americanOnly[textArr[i].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + americanOnly[textArr[i].toLowerCase()] + '</span>';
            } else if (americanToBritishSpelling[textArr[i].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + americanToBritishSpelling[textArr[i].toLowerCase()] + '</span>';
            } else if (americanToBritishTitles[textArr[i].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + americanToBritishTitles[textArr[i].toLowerCase()] + '</span>'
            } else if (americanToBritishRegex.test(textArr[i])) {
                textArr[i] = '<span class="highlight">' + textArr[i][0] + textArr[i][1] + '.' + textArr[i][3] + textArr[i][4] + '</span>';
            }  else if (textArr[i].toLowerCase() == 'rube' && textArr[i + 1].toLowerCase() == "goldberg") {
                textArr[i] = '<span class="highlight">' + americanOnly[textArr[i].toLowerCase() + ' ' + textArr[i + 1].toLowerCase() + ' ' + textArr[i + 2].toLowerCase()] + '</span>';
                textArr.splice(i + 1, 2);
            } else if (textArr[i].toLowerCase() == "mr" && textArr[i + 1] == '.' || textArr[i].toLowerCase() == "ms" && textArr[i + 1] == '.' || textArr[i].toLowerCase() == "mrs" && textArr[i + 1] == '.' || textArr[i].toLowerCase() == "mx" && textArr[i + 1] == '.' || textArr[i].toLowerCase() == "dr" && textArr[i + 1] == '.' || textArr[i].toLowerCase() == "prof" && textArr[i + 1] == '.') {
                textArr[i] = '<span class="highlight">' + americanToBritishTitles[textArr[i].toLowerCase() + textArr[i + 1].toLowerCase()] + '</span>';
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
        
        let joinedStr;

        for (let i = 0; i < textArr.length; i++) {
            if (i == 0) {
                joinedStr = textArr[i];
            } else if (specialRegex.test(textArr[i])) {
                joinedStr = joinedStr + textArr[i];
            } else {
                joinedStr = joinedStr + " " + textArr[i];
            }
        }

        return joinedStr;
    }

    britishToAmerican (text) {
        let textArr = text.split(splitRegex);

        for (let i = 0; i < textArr.length; i++) {
             if (i + 3 <= textArr.length && britishOnly[textArr[i].toLowerCase() + ' ' + textArr[i + 1].toLowerCase() + ' ' + textArr[i + 2].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + britishOnly[textArr[i].toLowerCase() + ' ' + textArr[i + 1].toLowerCase() + ' ' + textArr[i + 2].toLowerCase()] + '</span>';
                textArr.splice(i + 1, 2);
            } else if (i + 3 <= textArr.length && britishToAmericanOnly[textArr[i].toLowerCase() + ' ' + textArr[i + 1].toLowerCase() + ' ' + textArr[i + 2].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + britishToAmericanOnly[textArr[i].toLowerCase() + ' ' + textArr[i + 1].toLowerCase() + ' ' + textArr[i + 2].toLowerCase()] + '</span>';
                textArr.splice(i + 1, 2);
            } else if (i + 2 <= textArr.length && britishOnly[textArr[i].toLowerCase() + ' ' + textArr[i + 1].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + britishOnly[textArr[i].toLowerCase() + ' ' + textArr[i + 1].toLowerCase()] + '</span>';
                textArr.splice(i + 1, 1);
            } else if (i + 2 <= textArr.length && britishToAmericanOnly[textArr[i].toLowerCase() + ' ' + textArr[i + 1].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + britishToAmericanOnly[textArr[i].toLowerCase() + ' ' + textArr[i + 1].toLowerCase()] + '</span>';
                textArr.splice(i + 1, 1);
            } else if (textArr[i].toLowerCase() == 'heath' && textArr[i + 1].toLowerCase() == "robinson" && textArr[i + 2].toLowerCase() == 'device') {
                textArr[i] = '<span class="highlight">' + britishOnly[textArr[i].toLowerCase() + ' ' + textArr[i + 1].toLowerCase() + ' ' + textArr[i + 2].toLowerCase()] + '</span>';
                textArr.splice(i + 1, 2);
            } else if (britishOnly[textArr[i].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + britishOnly[textArr[i].toLowerCase()] + '</span>';
            } else if (britishToAmericanOnly[textArr[i].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + britishToAmericanOnly[textArr[i].toLowerCase()] + '</span>';
            } else if (britishToAmericanSpelling[textArr[i].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + britishToAmericanSpelling[textArr[i].toLowerCase()] + '</span>';
            } else if (britishToAmericanTitles[textArr[i].toLowerCase()]) {
                textArr[i] = '<span class="highlight">' + britishToAmericanTitles[textArr[i].toLowerCase()] + '</span>';
            } else if (i + 2 <= textArr.length && britishToAmericanRegex.test(textArr[i]) && textArr[i + 1][0] == '.' && britishToAmericanRegex.test(textArr[i + 1][1] + textArr[i + 1][2]) || i + 2 <= textArr.length && digitRegex.test(textArr[i]) && textArr[i + 1][0] == '.' && britishToAmericanRegex.test(textArr[i + 1][1] + textArr[i + 1][2])) {
                textArr[i] = '<span class="highlight">' + textArr[i] + ':' + textArr[i + 1][1] + textArr[i + 1][2] + '</span>';
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

        let joinedStr;

        for (let i = 0; i < textArr.length; i++) {
            if (i == 0) {
                joinedStr = textArr[i];
            } else if (specialRegex.test(textArr[i])) {
                joinedStr = joinedStr + textArr[i];
            } else {
                joinedStr = joinedStr + " " + textArr[i];
            }
        }
        


        return joinedStr;
    }

}

module.exports = Translator;