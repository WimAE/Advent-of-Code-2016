"use strict";

const fs = require('fs');
const os = require('os');
const assert = require ('assert');

function supportsTLS(input){
   let insideBrackets = false;
   let found = false;

   for (let i = 0; i < input.length; ++i){
       if (input[i] === '['){
           insideBrackets = true;
       }

       if (input[i] === ']'){
           insideBrackets = false;
       }

       // <3 slice, won't go out of bounds
       if (checkTLS(input.slice(i, i+4))){
            if (insideBrackets){
                return false; 
            }
            found = true; 
       }
   }
   return found;
}

function checkTLS(part){ 
    return part[0] === part[3] && 
            part[1] === part[2] && 
            part[0] !== part[2];
}

const input = fs.readFileSync("input.txt", "utf8" );
const rows = input.split(os.EOL);

const result = rows.filter(supportsTLS).length;
console.log("Result: ", result);

// --- TESTS
assert(supportsTLS("abba[mnop]qrst") === true);
assert(supportsTLS("abcd[bddb]xyyx") === false);
assert(supportsTLS("aaaa[qwer]tyui") === false);
assert(supportsTLS("ioxxoj[asdfgh]zxcvbn") === true);
