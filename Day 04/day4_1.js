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

function sumOfRealRooms(input){
    return input
        .map(parseToRoom)
        .filter(isReal)
        .reduce((total, room) => room.sector + total, 0);
}

const input = fs.readFileSync("input.txt", "utf8" );
const rows = input.split(os.EOL);

const sum = sumOfRealRooms(rows);
console.log("Sum: ", sum);

/* Really needed some tests for this one.. */
assert(isReal(parseToRoom('aaaaa-bbb-z-y-x-123[abxyz]')));
assert(isReal(parseToRoom('a-b-c-d-e-f-g-h-987[abcde]')));
assert(isReal(parseToRoom('not-a-real-room-404[oarel]')));
assert(isReal(parseToRoom('totally-real-room-200[decoy]')) === false);