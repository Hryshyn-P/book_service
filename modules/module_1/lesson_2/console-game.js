import "colors";
import { program } from "commander";
import { promises as fs } from "fs";
import { createInterface } from "readline";

/**
  An option is created using the option method, which takes three arguments:
    1. A string with the short and long option flags and optionally
      its value in square brackets. In this case, the -f and --file flags are used,
      and the value is optional and will be passed as [type].
    2. A string describing the option. It will be used in help messages --help.
    3. The default value to be used if the option is not passed on the command line.
*/
program.option(
  "-f, --file [type]",
  "file for saving game results",
  "results.txt"
);
program.parse(process.argv);

const readLine = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let count = 0;
const logFile = program.opts().file;
const mind = Math.floor(Math.random() * 10) + 1;

const isValid = (value) => {
  if (isNaN(value)) {
    console.log("Enter number!".red);
    return false;
  }
  if (value < 1 || value > 10) {
    console.log("The number shall be in the range 1 to 10".red);
    return false;
  }
  return true;
};

const log = async (data) => {
  await fs.appendFile(logFile, `${data}\n`)
      .then(() => console.log(`Succeeded saved to the file ${logFile}`.green))
      .catch((err) => console.error(`Could not save file ${logFile}`.red));
};

const game = () => {
  readLine.question(
    "Enter a number from 1 to 10 to guess the intended number: ".yellow,
    (value) => {
      let a = +value;
      if (!isValid(a)) {
        game();
        return;
      }
      ++count;
      if (a === mind) {
        console.log(
          "Congratulations You guessed the number for the %d step(s)".green,
          count
        );
        log(
          `${new Date().toLocaleDateString()}: Congratulations on guessing the ${count} step(s)`
        ).finally(() => readLine.close());
        return;
      }
      console.log("You missed, another attempt".red);
      game();
    }
  );
};

game();
