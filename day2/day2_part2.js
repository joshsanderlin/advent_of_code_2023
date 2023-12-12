const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

function readInput() {
  return readFile("day2_input", "binary");
}

const red = "red";
const green = "green";
const blue = "blue";

function powerFor(game) {
  mins = game.rounds.reduce(
    (roundAcc, round) => {
      round = round.reduce((drawAcc, draw) => {
        [number, color] = draw.split(" ");
        number = parseInt(number);
        drawAcc[color] = number;
        return drawAcc;
      }, {});
      console.log("round: ", round);
      for (const color of [red, green, blue]) {
        roundAcc[color] = Math.max(roundAcc[color], round[color] || 0);
      }
      return roundAcc;
    },
    { red: 0, green: 0, blue: 0 }
  );
  console.log("Mins for game ", game.gameId, "is", mins);
  power = mins[red] * mins[green] * mins[blue];
  console.log("Power for game ", game.gameId, "is", power);
  return power;
}

readInput().then((data) => {
  out = data
    .split("\n")
    .map((line) => {
      if (line.length == 0) return null;
      console.log("line", line);
      return {
        gameId: parseInt(line.match(/^Game\s(\d+):/)[1]),
        rounds: line
          .match(/^Game\s\d+:\s(.*)/)[1]
          .split("; ")
          .map((round) => round.split(", ")),
      };
    })
    .filter((n) => n)
    .reduce((acc, cur) => {
      return acc + powerFor(cur);
    }, 0);

  console.log("Output: ", out);
});
