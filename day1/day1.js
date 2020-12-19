const { inputs } = require("./inputs");
//Find the two nums in the inputs that add up to 2020 then return the product

// let test = [1721, 979, 366, 299, 675, 1456];
let test = [1010, 979, 366, 1011, 675, 1456];

function main(input) {
  if (search(input)) {
    let [num1, num2, num3] = search(input);

    console.log(num1, num2, num3);
    return num1 * num2 * num3;
  }
  return false;
}

//This will work, but I can do this better with a findindex or something.

function search(input) {
  for (let i = 0; i < input.length - 2; i++) {
    for (let j = i + 1; j < input.length - 1; j++) {
      for (let k = j + 1; k < input.length; k++)
        if (input[i] + input[j] + input[k] === 2020) {
          return [input[i], input[j], input[k]];
        }
    }
  }

  return false;
}

console.log(main(inputs));
