//count the number of valid passports
//a passport is valid if they have all the fields, or if they are only missing the cid

const { timeStamp } = require('console');
const fs = require('fs');
const { checkServerIdentity } = require('tls');

function main() {
  let data = fs.readFileSync(`${__dirname}/input.js`, (err, thing) => {});

  let passports = parse(data.toString());

  console.log('here be the passports', passports.length);

  console.log(check(passports));
}

function parse(data) {
  let entries = data.replace(/\n/g, '').split(/\r\r/);
  let clean = entries.map((entry) => entry.replace(/\r/g, ' ').split(' '));

  let passports = [];

  clean.forEach((thing) => {
    let passport = {};
    thing.forEach((entry) => {
      let kv = entry.split(':');
      passport[kv[0]] = kv[1];
    });
    passports.push(passport);
  });

  return passports;
}

function check(passports) {
  let count = 0;

  passports.forEach((passport) => {
    let fields = Object.keys(passport);

    if (
      (fields.includes('cid') && fields.length === 8) ||
      (!fields.includes('cid') && fields.length === 7)
    ) {
      if (validateVals(passport) === true) {
        count++;
      }
    }
  });
  return count;
}

function validateVals(passport) {
  if (passport.byr < 1920 || passport.byr > 2002) {
    return false;
  }

  if (passport.iyr < 2010 || passport.iyr > 2020) {
    return false;
  }

  if (passport.eyr < 2020 || passport.eyr > 2030) {
    return false;
  }

  if (!passport.hgt.endsWith('cm') && !passport.hgt.endsWith('in')) {
    return false;
  }

  if (passport.hgt.endsWith('cm')) {
    let height = passport.hgt.replace('cm', '');
    if (height < 150 || height > 193) {
      return false;
    }
  } else if (passport.hgt.endsWith('in')) {
    let height = passport.hgt.replace('in', '');
    if (height < 59 || height > 76) {
      return false;
    }
  }

  let regEx = /^#[a-f0-9]{6}$/;

  if (regEx.test(passport.hcl) === false) {
    return false;
  }

  let pidReg = /^[0-9]{9}$/;

  if (pidReg.test(passport.pid) === false) {
    return false;
  }

  let colors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

  if (!colors.includes(passport.ecl)) {
    return false;
  }

  return true;
}

main();

//hair color is a # and 6 chars 0-9, a-f;
