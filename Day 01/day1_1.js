"use strict";

const fs = require('fs');

const ORIENTATION = {
    UP: 0, 
    RIGHT: 1, 
    DOWN: 2, 
    LEFT: 3
}

let pos = {x:0, y:0};
let ori = ORIENTATION.UP;

function move(cmd){
    if (cmd.dir === 'L'){
        ori -= 1;
    }
    else if (cmd.dir === 'R'){
        ori += 1;    
    }
    ori = (ori + 4) % 4;

    switch(ori){
        case ORIENTATION.UP:    pos.y += cmd.steps; break;
        case ORIENTATION.RIGHT: pos.x += cmd.steps; break;
        case ORIENTATION.DOWN:  pos.y -= cmd.steps; break;
        case ORIENTATION.LEFT:  pos.x -= cmd.steps; break;
    }    
}

function shortestPath(x, y){
    return Math.abs(x) + Math.abs(y);
}

const input = fs.readFileSync("input.txt", "utf8" );
const instructions = input.split(', ').map(
        str => ({
            dir: str[0],
            steps: parseInt(str.substring(1)),
        })
    ).forEach(move);

const result = shortestPath(pos.x, pos.y);
console.log("Result: ", result);