"use strict";

const fs = require('fs');
const os = require('os');

function isValidTriangle(row){
    let x = parseInt(row[0]);
    let y = parseInt(row[1]);
    let z = parseInt(row[2]);

    return x + y > z && y + z > x && z + x > y;
}

/* Credit to http://stackoverflow.com/questions/4856717/javascript-equivalent-of-pythons-zip-function */
function zip(arrays) {
    return arrays[0].map(function(_,i){
        return arrays.map(function(array){return array[i]})
    });
}

function triangles(columns){   
    const output = []; 
    for (const column of columns){
        for (let i = 0; i < column.length; i += 3) {
            output.push(column.slice(i, i + 3));
        }
    }
    return output;
}

const input = fs.readFileSync("input.txt", "utf8" );
const rows = input.split(os.EOL);
const columns = zip(rows.map(row => row.trim().split(" ").filter(i => i.trim() !== '')));
const result = triangles(columns).filter(isValidTriangle).length;

console.log("Result", result);