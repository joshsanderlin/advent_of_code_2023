const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

function readInput() {
  return readFile("day2_input", "binary");
}

// 12 red, 13 green, 14 blue
function possibleGame(game) {
  let possible = game.rounds.some((round) => {
    return round.some((draw) => {
      [number, color] = draw.split(" ");
      switch (color) {
        case "red":
          if (number > 12) return true;
          break;
        case "green":
          if (number > 13) return true;
          break;
        case "blue":
          if (number > 14) return true;
          break;
      }
      return false;
    });
  });
  if (possible) console.log("Possible Game: ", game);
  return possible;
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
      if (possibleGame(cur)) return acc + cur.gameId;
      return acc;
    }, 0);

  console.log("Output: ", out);
});
