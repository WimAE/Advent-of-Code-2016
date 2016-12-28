"use strict";

const fs = require('fs');
const os = require('os');
const assert = require ('assert');

function decompress(input){
    let result = '';    

    for (let i = 0; i < input.length;){
        const ch = input[i++];

        if (ch !== '(') {
            result += ch;
        }
        else {
            const x_index = input.substr(i).indexOf('x');
            const length =  parseInt(input.substr(i, x_index));

            i += x_index+1;

            const end_index = input.substr(i).indexOf(')');
            let times =  parseInt(input.substr(i, end_index));

            i += end_index+1;
             
            const part = input.slice(i, i + length);
            
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

const result = decompress(cleanInput);
console.log("Result: ", result.length);

assert(decompress("A(1x5)BC")  === "ABBBBBC");
assert(decompress("(3x3)XYZ")  === "XYZXYZXYZ");
assert(decompress("A(2x2)BCD(2x2)EFG")  === "ABCBCDEFEFG");
assert(decompress("(6x1)(1x3)A")  === "(1x3)A");
assert(decompress("X(8x2)(3x3)ABCY")  === "X(3x3)ABC(3x3)ABCY");