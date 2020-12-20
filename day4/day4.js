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
      if (validateVals(passport)) {
        count++;
      }
    }
  });
  return count;
}

function validateVals(passport) {
  let res;

  if (passport.byr < 1920 || passport.byr > 2002) {
    res = false;
  }

  if (passport.iyr < 2010 || passport.iyr > 2020) {
    res = false;
  }

  if (passport.eyr < 2020 || passport.eyr > 2030) {
    res = false;
  }

  if (passport.hgt.endsWith('cm')) {
    passport.hgt.replace('cm', '');
    if (passport.hgt < 150 || passport.hgt > 193) res = false;
  } else if (passport.hgt.endsWith('in')) {
    passport.hgt.replace('in', '');
    if (passport.hgt < 59 || passport.hgt > 76) {
      res = false;
    }
  }
}

main();
