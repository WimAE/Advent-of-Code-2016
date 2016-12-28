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
let hist = {'0-0': true};

function move(){
    switch(ori){
        case ORIENTATION.UP:    pos.y++; break;
        case ORIENTATION.RIGHT: pos.x++; break;
        case ORIENTATION.DOWN:  pos.y--; break;
        case ORIENTATION.LEFT:  pos.x--; break;
    }    
}

function rotate(dir){
    if (dir === 'L'){
        ori -= 1;
    }
    else if (dir === 'R'){
        ori += 1;    
    }
    ori = (ori + 4) % 4;
}

function checkHistory(){
    let location = pos.x + '-' + pos.y;
    if (hist[location]) {
        return true;
    }      
    hist[location] = true;
}

function findFirstIntersection(instructions){
    let found = false;
    for(const cmd of instructions){   
        rotate(cmd.dir);
        for(let i = 0; i < cmd.steps && !found; ++i){
            move();
            found = checkHistory();
        }
    }

    if (found){
        return pos;
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
    );

const intersection = findFirstIntersection(instructions);
const result = shortestPath(intersection.x, intersection.y);
console.log("Result: ", result);