"use strict";

const fs = require('fs');
const os = require('os');

const keyPad = [
    [0,0,1,0,0],
    [0,2,3,4,0],
    [5,6,7,8,9],
    [0,'A','B','C',0],
    [0,0,'D',0,0]
];

function move(pos, dir){
    let prev = Object.assign({}, pos);
    switch(dir){
        case 'U': pos.y = pos.y >= 1 ? pos.y - 1 : 0; break;
        case 'R': pos.x = pos.x <= 3 ? pos.x + 1 : 4; break;
        case 'D': pos.y = pos.y <= 3 ? pos.y + 1 : 4; break;
        case 'L': pos.x = pos.x >= 1 ? pos.x - 1 : 0; break;
    } 
    return translate(pos) == 0 ? prev : pos; 
}

function translate (pos){
    return keyPad[pos.y][pos.x];
}

const input = fs.readFileSync("input.txt", "utf8" );
const rows = input.split(os.EOL);

let pos = {x:0, y:2};
let code = rows.map(row => translate(pos = row.split('').reduce(move, pos)));
    
console.log("Code", code);