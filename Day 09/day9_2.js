"use strict";

const fs = require('fs');
const os = require('os');
const assert = require ('assert');

function decompressCount(input){
    let result = 0;    

    for (let i = 0; i < input.length;){
        const ch = input[i++];

        if (ch !== '('){
            result ++; // only count now, else out of mem :)
        }
        else {
            const x_index = input.substr(i).indexOf('x');
            const length =  parseInt(input.substr(i, x_index));

            i += x_index+1;

            const end_index = input.substr(i).indexOf(')');
            let times =  parseInt(input.substr(i, end_index));

            i += end_index+1;

            const part = decompressCount(input.slice(i, i + length));
            
            while (times--){ 
                result += part;
            }
            i += length;
        }
    }
    return result;
}

const input = fs.readFileSync("input.txt", "utf8" );
const cleanInput = input.replace(/\s/g,'');

const result = decompressCount(cleanInput);
console.log("Result: ", result);

assert(decompressCount("X(8x2)(3x3)ABCY")  === "XABCABCABCABCABCABCY".length);
assert(decompressCount("(27x12)(20x12)(13x14)(7x10)(1x12)A")  === 241920);
assert(decompressCount("(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN")  === 445);