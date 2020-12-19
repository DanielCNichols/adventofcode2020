let { INPUTS } = require("./inputs");

function checkPass(input) {
  let count = 0;
  input.forEach((val) => {
    let [pass, nums, target] = parseInput(val);

    if (validate(pass, nums, target)) {
      count++;
    }
  });

  return count;
}

function validate(pass, nums, target) {
  let count = 0;

  // for (let i in pass) {
  //   if (pass.charAt(i) === target) {
  //     count++;
  //   }
  // }

  // if (count >= nums[0] && count <= nums[1]) {
  //   return true;
  // } else {
  //   return false;
  // }

  //* Now we ware talking about matching indexes
  if (
    (pass.charAt(nums[0] - 1) === target &&
      pass.charAt(nums[1] - 1) !== target) ||
    (pass.charAt(nums[1] - 1) === target && pass.charAt(nums[0] - 1) !== target)
  ) {
    return true;
  } else {
    return false;
  }
}

function parseInput(input) {
  let parts = input.split(" ");
  let pass = parts[2];
  let nums = parts[0].split("-");
  let target = parts[1].substring(0, 1);

  return [pass, nums, target];
}

console.log(checkPass(INPUTS));
console.log(INPUTS.length);
