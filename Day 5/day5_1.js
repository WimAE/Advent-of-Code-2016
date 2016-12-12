"use strict";

const fs = require('fs');
const crypto = require('crypto');
const assert = require('assert');

function getMD5(input){
    return crypto.createHash("md5").update(input).digest("hex");
}

function isValid(input){
    return input.startsWith("00000");
}

function getCode(input){
    return input[5];
}

function getPassword(input){
    let password = '';
    for (let i = 0; password.length !== 8; ++i){
        const next = getMD5(input + i);
        password += isValid(next) ? getCode(next) : '';       
    }
    return password;
}


// Store prefix 

const input = fs.readFileSync("input.txt", "utf8" );
const result = getPassword(input);
console.log("Password: ", result);

// Small test to check md5 working 
assert(getCode(getMD5("abc3231929")) === '1');