"use strict";

const fs = require('fs');
const crypto = require('crypto');

function getMD5(input){
    return crypto.createHash("md5").update(input).digest("hex");
}

function isValid(input){
    return input.startsWith("00000");
}

function getCode(input){
    return {
        location: parseInt(input[5]),
        codeValue: input[6]
    }
}

function addToPassword(code, password){
    if (code.location < 8 && password[code.location] === ''){              
        password[code.location] = code.codeValue;
    }
    return password;
}

function getPassword(input){
    let password = ['','','','','','','',''];
    for (let i = 0; password.join('').length !== 8; ++i){
        const next = getMD5(input + i);
        if (isValid(next)){
            password = addToPassword(getCode(next), password);
        }      
    }
    return password.join('');
}

const input = fs.readFileSync("input.txt", "utf8" );
const result = getPassword(input);
console.log("Password: ", result);