"use strict";

const fs = require('fs');
const os = require('os');
const assert = require ('assert');

function supportsSSL(input){
   let insideBrackets = false;
   let found = false;

   let aba = [];
   let bab = [];

   for (let i = 0; i < input.length; ++i){
       if (input[i] === '['){
           insideBrackets = true;
       }

       if (input[i] === ']'){
           insideBrackets = false;
       }

       const part = input.slice(i, i+3);

       if (checkPart(part)){
            if (insideBrackets){
                bab.push(part);
            }
            else{                
                aba.push(part);
            }

            if (checkSSL(aba, bab)){
                found = true;
            }
       }       
   }
   return found;
}

function checkPart(part){ 
    return part[0] === part[2] && part[0] !== part[1];
}

function checkSSL(aba, bab){
    for (const str of aba){    
        if (bab.indexOf(str[1] + str[0] + str[1]) >= 0){
            return true;
        }
    }    
    return false;
}

const input = fs.readFileSync("input.txt", "utf8" );
const rows = input.split(os.EOL);

const result = rows.filter(supportsSSL).length;
console.log("Result: ", result);

// --- TESTS
assert(supportsSSL("aba[bab]xyz") === true);
assert(supportsSSL("xyx[xyx]xyx") === false);
assert(supportsSSL("aaa[kek]eke") === true);
assert(supportsSSL("zazbz[bzb]cdb") === true);
