"use strict";

const fs = require('fs');
const os = require('os');
const assert = require('assert')

function parseToRoom(input){
    const match = /([a-z-]+?)-(\d+)\[([a-z]+)\]/.exec(input)
    return {
        name: match[1],
        sector: parseInt(match[2]),
        checksum: match[3]        
    }
}

function shiftName(name, times){
    return name
        .split('')
        .map(c => c === '-' ? ' ' : shift(c, times))
        .join('');
}

function shift(char, times){
    return String.fromCharCode((char.charCodeAt(0) + times - 97) % 26 + 97);
}

function calculateChecksum(room){
    const chars = room.split('');
    const dict = {};
    const result = [];

    for(const char of chars){
        if (char !== '-'){
              dict[char] = dict[char] ? dict[char] + 1 : 1;           
        }
    }

    for (const char in dict){
        result.push([char, dict[char]]);
    }

    return result
            .sort(compare)
            .map(a => a[0])
            .slice(0, 5)
            .join(''); 
}

function compare(a, b){
    return a[1] > b[1] ? -1 : 
           a[1] < b[1] ? 1 :
           a[0] > b[0] ? 1 : -1;
}

function isReal(room){
    return room.checksum === calculateChecksum(room.name);
}

function getSectorByName(input, name){
    return input
        .map(parseToRoom)
        .filter(isReal)
        .filter(room => shiftName(room.name, room.sector).indexOf(name) > 0)
        .map(room => room.sector)[0];
}

const input = fs.readFileSync("input.txt", "utf8" );
const rows = input.split(os.EOL);

const sector = getSectorByName(rows, 'pole');
console.log("Sector: ", sector);

/* Really needed some tests for this one.. */
assert(shiftName("qzmt-zixmtkozy-ivhz", 343) === "very encrypted name");