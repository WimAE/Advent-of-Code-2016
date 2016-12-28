"use strict";

const fs = require('fs');
const os = require('os');

const M_WIDTH = 50;
const M_HEIGHT = 6;

function drawMatrix(matrix){
    for (let i = 0; i < M_HEIGHT; ++i) {       
       for(let j = 0; j < M_WIDTH; ++j) {
           process.stdout.write(matrix[i][j]  ? '#' : ' ')
        }
        process.stdout.write('\n');
    }
}

function addRect(height, width, matrix){
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            matrix[i][j] = true;
        }
    }
    return matrix;
}

function rotateRow(row, by, matrix){
    const oldRow = matrix[row].slice();
    for (let i = 0; i < M_WIDTH; ++i ){        
        matrix[row][(i + by) % M_WIDTH] = oldRow[i];
    }
    return matrix;
}

function rotateColumn(column, by, matrix){
    const oldColumn = matrix.map(m => m[column]);
    for (let i = 0; i < M_HEIGHT; ++i ){        
        matrix[(i + by) % M_HEIGHT][column] = oldColumn[i];
    }
    return matrix;
}

function initMatrix(){
    let matrix = [];
    for (let i = 0; i < M_HEIGHT; i++) {
        matrix[i] = [];
        for (let j = 0; j < M_WIDTH; j++) {
            matrix[i][j] = false;
        }
    }
    return matrix;
}

function countOn(matrix){
    let total = 0;
    for (let i = 0; i < M_HEIGHT; i++) {
        for (let j = 0; j < M_WIDTH; j++) {
            total += matrix[i][j] ? 1 : 0;
        }
    }
    return total;
}

// Hmm this could be easier with a regex...
function createCmd(row){

    const commands = row.split(" ");
    
    if (commands[0] === "rect"){
        const sizes = commands[1].split("x");
        return {
            type: "rect",
            height: parseInt(sizes[0]),
            width: parseInt(sizes[1])
        }
    }
    else if (commands[0] === "rotate"){
        if (commands[1] === "column"){
            return {
                type: "rotate-column",
                column: parseInt(commands[2].split("=")[1]),
                by: parseInt(commands[4])   
            }        
        } 
        else if (commands[1] === "row"){
            return {
                type: "rotate-row",
                row: parseInt(commands[2].split("=")[1]),
                by: parseInt(commands[4]) 
            }        
        }
    }
}

function parseCmd(matrix, cmd){    
    switch (cmd.type){
        case "rect": addRect(cmd.width, cmd.height, matrix); break;
        case "rotate-column": rotateColumn(cmd.column, cmd.by, matrix); break;
        case "rotate-row": rotateRow(cmd.row, cmd.by, matrix); break;
        default: console.error("unknown command: ", cmd);
    }
    return matrix;
}

const input = fs.readFileSync("input.txt", "utf8" );
const rows = input.split(os.EOL);

const result = rows.map(createCmd).reduce(parseCmd, initMatrix());
drawMatrix(result);
console.log("Result: ", countOn(result));