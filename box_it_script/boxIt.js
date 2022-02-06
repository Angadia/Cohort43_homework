const CENTERED_H_LINE = String.fromCharCode(0x2500);
const CENTERED_V_LINE = String.fromCharCode(0x2502);
const TOP_LEFT_CORNER = String.fromCharCode(0x250c);
const TOP_RIGHT_CORNER = String.fromCharCode(0x2510);
const BOTTOM_LEFT_CORNER = String.fromCharCode(0x2514);
const BOTTOM_RIGHT_CORNER = String.fromCharCode(0x2518);
const MIDDLE_LEFT_T = String.fromCharCode(0x251c);
const MIDDLE_RIGHT_T = String.fromCharCode(0x2524);

const drawLine = (length) => {
  return String("").padEnd(length, CENTERED_H_LINE);
};

const drawTopBorder = (length) => {
  if (length < 0) length = 0;
  return TOP_LEFT_CORNER.padEnd(length + 1, drawLine(length)).padEnd(
    length + 2,
    TOP_RIGHT_CORNER
  );
};

const drawBottomBorder = (length) => {
  if (length < 0) length = 0;
  return BOTTOM_LEFT_CORNER.padEnd(length + 1, drawLine(length)).padEnd(
    length + 2,
    BOTTOM_RIGHT_CORNER
  );
};

const drawMiddleBorder = (length) => {
  if (length < 0) length = 0;
  return MIDDLE_LEFT_T.padEnd(length + 1, drawLine(length)).padEnd(
    length + 2,
    MIDDLE_RIGHT_T
  );
};

const drawBarsAround = (text) => {
  return CENTERED_V_LINE.padEnd(text.length + 1, text).padEnd(
    text.length + 2,
    CENTERED_V_LINE
  );
};

const boxIt = (arrayStrings) => {
  let maxLength = 0;

  arrayStrings.forEach((text) => {
    if (text.length > maxLength) {
      maxLength = text.length;
    }
  });

  let paddedString = drawTopBorder(maxLength).concat("\n");
  for (let index = 0; index < arrayStrings.length; index++) {
    const text = arrayStrings[index];
    paddedString = paddedString
      .concat(drawBarsAround(text.padEnd(maxLength)))
      .concat("\n");
    if (index != arrayStrings.length - 1) {
      paddedString = paddedString
        .concat(drawMiddleBorder(maxLength))
        .concat("\n");
    }
  }
  return paddedString.concat(drawBottomBorder(maxLength));
};

console.log(boxIt(process.argv.slice(2)));
