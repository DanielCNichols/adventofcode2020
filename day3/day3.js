const { input } = require('./inputs');

function trees(input) {
  let trees = 0;
  let pos = 0; //starting index

  for (let i = 0; i <= input.length; i += 2) {
    let x = pos % input[i].length;

    if (input[i].charAt(x) === '#') {
      trees = trees += 1;
    }
    pos += 1;
  }
  return trees;
}

console.log(trees(input));

//have an array of strings, each with 31 chars
//will go through each string, but at a different index (down 1, over 3)
//Strings repeat to build the map.

//we need to keep track of the lateral position, but keep it traversing in a loop, i.e. position 34 = 34 % 31 -> 3 //third index, or string[2]

/* Results
1. R1, d1 //78
2. R 3; d1 // 262
3. R5, d1  //; 66
4. R7, d1  // 69
5. R1, D2  29
*/

// input.forEach((string) => {
//   let x = pos % string.length;
//   if (string.charAt(x) === '#') {
//     trees = trees + 1;
//   }

//   //update position
//   pos += 1;
// });
