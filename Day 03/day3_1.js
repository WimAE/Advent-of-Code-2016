"use strict";

const fs = require('fs');
const os = require('os');

function isValidTriangle(row){
    let x = parseInt(row[0]);
    let y = parseInt(row[1]);
    let z = parseInt(row[2]);

    return x + y > z && y + z > x && z + x > y;
}

const input = fs.readFileSync("input.txt", "utf8" );
const rows = input.split(os.EOL);

const result = rows.map(
    row => row.trim().split(" ").filter(i => i.trim() !== ''))
            .filter(isValidTriangle).length;

console.log("Count: ", result);