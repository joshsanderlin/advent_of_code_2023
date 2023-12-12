const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

function readInput() {
  return readFile("day1_input", "binary");
}

function reverseStr(str) {
  return str.split("").reverse().join();
}

function isDigit(char) {
  return char >= "0" && char <= "9";
}

function isDigitWord(
  line,
  index,
  digitWords = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ]
) {
  if (index > line.length) return false;

  const badstr = "!!!!!!";
  // Positive Base Case
  emptyIndex = digitWords.indexOf("");
  if (emptyIndex > 0) return emptyIndex;

  if (digitWords.some((digitWord) => digitWord != badstr)) {
    // Recurse
    return isDigitWord(
      line,
      index + 1,
      digitWords.map((digitWord) => {
        if (line[index] == digitWord[0]) return digitWord.slice(1);
        return badstr;
      })
    );
  } else {
    // Negative Base Case
    return false;
  }
}

function isDigitOrDigitWord(line, i) {
  if (isDigit(line[i])) {
    return parseInt(line[i]);
  } else {
    return isDigitWord(line, i);
  }
}

function firstDigit(line) {
  for (let i = 0; i < line.length; i++) {
    let dw = isDigitOrDigitWord(line, i);
    if (dw) return dw;
  }
}

function lastDigit(line) {
  for (let i = line.length - 1; i >= 0; i--) {
    let dw = isDigitOrDigitWord(line, i);
    if (dw) return dw;
  }
}

line1 = "nqninenmvnpsz874";
line2 = "8twofpmpxkvvdnpdnlpkhseven4ncgkb";
line3 = "six8shdkdcdgseven8xczqrnnmthreecckfive";
line985 = "9nkhntmrll";

// console.log(firstDigit(line985));
// console.log(lastDigit(line985));

readInput().then((data) => {
  out = data
    .split("\n")
    .map((line) => {
      return firstDigit(line) * 10 + lastDigit(line);
    })
    .reduce((acc, cur, i) => {
      console.log("cur:", cur, " line:", i + 1);
      if (!isNaN(cur)) return acc + cur;
      else return acc;
    }, 0);

  console.log(out);
});
