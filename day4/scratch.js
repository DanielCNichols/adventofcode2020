let regEx = /^#[a-f0-9]{6}$/;

let height = '123cm';

let shitfuck = height.replace('cm', '');

let pidReg = /^[0-9]{9}$/;

console.log(pidReg.test('12345678'));
console.log(pidReg.test('000000009'));
