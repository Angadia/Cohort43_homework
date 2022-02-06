#! /usr/bin/env node

const CENTERED_H_LINE = String.fromCharCode(0x2500);
const CENTERED_V_LINE = String.fromCharCode(0x2502);
const TOP_LEFT_CORNER = String.fromCharCode(0x250c);
const TOP_RIGHT_CORNER = String.fromCharCode(0x2510);
const BOTTOM_LEFT_CORNER = String.fromCharCode(0x2514);
const BOTTOM_RIGHT_CORNER = String.fromCharCode(0x2518);
const MIDDLE_LEFT_T = String.fromCharCode(0x251c);
const MIDDLE_RIGHT_T = String.fromCharCode(0x2524);
const TOP_T = String.fromCharCode(0x252c);
const BOTTOM_T = String.fromCharCode(0x2534);
const MIDDLE_CROSS = String.fromCharCode(0x253c);

const drawLine = (length) => {
  return String("").padEnd(length, CENTERED_H_LINE);
};

const drawTopBorder = (maxLengths) => {
  let paddedString = TOP_LEFT_CORNER;
  for (let index = 0; index < maxLengths.length; index++) {
    const maxLength = maxLengths[index];
    paddedString = paddedString.concat(drawLine(maxLength));
    if (index != maxLengths.length - 1) {
      paddedString = paddedString.concat(TOP_T);
    }
  }
  return paddedString.concat(TOP_RIGHT_CORNER);
};

const drawBottomBorder = (maxLengths) => {
  let paddedString = BOTTOM_LEFT_CORNER;
  for (let index = 0; index < maxLengths.length; index++) {
    const maxLength = maxLengths[index];
    paddedString = paddedString.concat(drawLine(maxLength));
    if (index != maxLengths.length - 1) {
      paddedString = paddedString.concat(BOTTOM_T);
    }
  }
  return paddedString.concat(BOTTOM_RIGHT_CORNER);
};

const drawMiddleBorder = (maxLengths) => {
  let paddedString = MIDDLE_LEFT_T;
  for (let index = 0; index < maxLengths.length; index++) {
    const maxLength = maxLengths[index];
    paddedString = paddedString.concat(drawLine(maxLength));
    if (index != maxLengths.length - 1) {
      paddedString = paddedString.concat(MIDDLE_CROSS);
    }
  }
  return paddedString.concat(MIDDLE_RIGHT_T);
};

const drawBarsAround = (arrayStrings) => {
  let paddedString;
  for (let index = 0; index < arrayStrings.length; index++) {
    const text = arrayStrings[index];
    if (index == 0) {
      paddedString = CENTERED_V_LINE.padEnd(text.length + 1, text).padEnd(
        text.length + 2,
        CENTERED_V_LINE
      );
    } else {
      paddedString = paddedString.concat(
        text.padEnd(text.length + 1, CENTERED_V_LINE)
      );
    }
  }
  return paddedString;
};

const boxIt = (arrayStringArrays) => {
  const maxLengths = [];
  for (let index = 0; index < arrayStringArrays.length; index++) {
    const stringArray = arrayStringArrays[index];
    for (let strIndex = 0; strIndex < stringArray.length; strIndex++) {
      if (arrayStringArrays[0].length < stringArray.length) {
        return "Please provide a CSV file in the required format.";
      }
      if (index == 0) {
        maxLengths.push(0);
      }
      const text = stringArray[strIndex];
      if (maxLengths[strIndex] < text.length) {
        maxLengths[strIndex] = text.length;
      }
    }
  }

  let paddedString = drawTopBorder(maxLengths).concat("\n");
  for (let index = 0; index < arrayStringArrays.length; index++) {
    const stringArray = arrayStringArrays[index];
    const tmpArrayStrings = [];
    for (let strIndex = 0; strIndex < stringArray.length; strIndex++) {
      const text = stringArray[strIndex];
      tmpArrayStrings.push(text.padEnd(maxLengths[strIndex]));
    }
    paddedString = paddedString
      .concat(drawBarsAround(tmpArrayStrings))
      .concat("\n");
    if (index < arrayStringArrays.length - 1) {
      paddedString = paddedString
        .concat(drawMiddleBorder(maxLengths))
        .concat("\n");
    }
  }
  return paddedString.concat(drawBottomBorder(maxLengths));
};

if (process.argv.length === 3 && process.argv[2].endsWith(".csv")) {
  const fs = require("fs");
  const readline = require("readline");
  const stream = require("stream");

  const instream = fs.createReadStream(process.argv[2]);
  const outstream = new stream();
  const rl = readline.createInterface(instream, outstream);

  const arrayStringArrays = [];

  rl.on("line", function (line) {
    arrayStringArrays.push(line.split(","));
  });

  rl.on("close", function () {
    console.log(boxIt(arrayStringArrays));
  });
} else {
  console.log("Please provide a CSV file in the required format.");
}
