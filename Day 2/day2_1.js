"use strict";

const fs = require('fs');
const os = require('os');

const keyPad = [[1,2,3],[4,5,6],[7,8,9]];

function move(pos, dir){
    switch(dir){
        case 'U': pos.y = pos.y >= 1 ? pos.y - 1 : 0; break;
        case 'R': pos.x = pos.x <= 1 ? pos.x + 1 : 2; break;
        case 'D': pos.y = pos.y <= 1 ? pos.y + 1 : 2; break;
        case 'L': pos.x = pos.x >= 1 ? pos.x - 1 : 0; break;
    } 
    return pos;   
}

function translate (pos){
    return keyPad[pos.y][pos.x];
}

const input = fs.readFileSync("input.txt", "utf8" );
const rows = input.split(os.EOL);

let pos = {x:1, y:1};
let code = rows.map(row => translate(pos = row.split('').reduce(move, pos)));

console.log("code", code);