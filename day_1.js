const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

function readInput() {
  return readFile("day_1_input", "binary");
}

function reverseStr(str) {
  return str.split("").reverse().join();
}

function firstDigit(line) {
  return line[line.search(/\d/)];
}

readInput().then((data) => {
  out = data
    .split("\n")
    .map((line) => {
      return firstDigit(line) + firstDigit(reverseStr(line));
    })
    .map((str) => parseInt(str))
    .reduce((acc, cur) => {
      if (!isNaN(cur)) return acc + cur;
      else return acc;
    }, 0);

  console.log(out);
});
