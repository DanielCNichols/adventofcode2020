//Find your seat.
//Binary choices FBFBFBFLRL;
//F: Take the lower half; B take the upper half
//round up
//R = upper half, L = lower half
//rows = 0 -127
//Columns = 0 - 7.

const fs = require('fs');

function main() {
  let maxId = 0;
  let ids = [];
  let data = fs.readFileSync(`${__dirname}/input.txt`, (err, list) => list);

  let passes = data.toString().replace(/\r/g, '').split(/\n/);

  passes.forEach((pass) => {
    ids.push(parse(pass));
    if (parse(pass) > maxId) {
      maxId = parse(pass);
    }
  });

  ids.sort((a, b) => a - b);

  //get the thing
  for (let i = 0; i < ids.length; i++) {
    if (ids[i + 1] !== ids[i] + 1) {
      console.log('this is your seat', ids[i] + 1);
      break;
    }
  }

  return maxId;
}

function parse(pass) {
  let rowsLow = 0;
  let rowsHigh = 127;
  let colsLow = 0;
  let colsHigh = 7;

  let rowFind = pass.substring(0, 7);
  let colFind = pass.substring(7);

  for (let i in rowFind) {
    if (rowFind.charAt(i) === 'F') {
      rowsHigh = Math.floor((rowsHigh + rowsLow) / 2);
    } else {
      rowsLow = Math.ceil((rowsHigh + rowsLow) / 2);
    }
  }

  for (let i in colFind) {
    if (colFind.charAt(i) === 'L') {
      colsHigh = Math.floor((colsHigh + colsLow) / 2);
    } else {
      colsLow = Math.ceil((colsHigh + colsLow) / 2);
    }
  }

  return rowsHigh * 8 + colsHigh;
}

console.log(main());
