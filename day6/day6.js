//We are given a list of inputs separated by blank lines
//Each group contains alphabetic representations of questions which were answered "yes";
//get the number of unique questions answered yes by anyone in the group.
// sum up the groups and return the total.

const fs = require('fs');

function main() {
  let data = fs.readFileSync(`${__dirname}/input.txt`, (err, vals) => vals);

  let groups = data.toString().replace(/\r/g, '').split('\n\n');

  let parsed = groups.map((group) => group.replace(/\n/g, ''));

  let sum = 0;
  let sumUn = 0;

  groups.forEach((group) => {
    //build the set
    let yesSet = new Set(group.replace(/\n/g, ''));
    let members = group.split(/\n/);

    for (let ans of yesSet) {
      for (let i = 0; i < members.length; i++) {
        if (!members[i].includes(ans)) {
          break;
        }

        if (i === members.length - 1) {
          sumUn++;
        }
      }
    }
  });

  // parsed.forEach((group) => {
  //   let set1 = new Set(group);

  //   sum += set1.size;
  // });

  return sumUn;
}

console.log(main());

//Part II: ONly need to count the questions that were unanimously answered yes.

//The set already contains ALL the unique "yes" questions
// Perhaps...
//We could iterate over thet set and check each persons responses. A missing response breaks.
