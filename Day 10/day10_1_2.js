"use strict";

const fs = require('fs');
const os = require('os');
const KIND = { BOT:"bot",  OUTPUT:"output" };

function addToBot(value, id, bots){
    if (bots[id]){
        bots[id].push(parseInt(value));
    }
    else {
        bots[id] = [parseInt(value)];
    }    
    return bots;
}

function addToOutput(value, id, outputs){
     if (outputs[id]){
        outputs[id].push(parseInt(value));
    }
    else {
        outputs[id] = [parseInt(value)];
    }    
    return outputs;
}

function addToZoom(botId, lowKind, lowId, highKind, highId, toZoom){
    toZoom.push({
       botId: parseInt(botId),
       lowKind: lowKind === KIND.BOT ? KIND.BOT : KIND.OUTPUT,
       lowId: parseInt(lowId),
       highKind: highKind === KIND.BOT ? KIND.BOT : KIND.OUTPUT, 
       highId: parseInt(highId)
    });

    return toZoom;
}

function checkBots(bots){
    for(const bot of bots){
        if (bot && bot.length == 2){
            return true;
        }
    };
    return false;
}

function checkZoomList(bots, outputs, toZoom){
    
    for(const cmd of toZoom){
        if (bots[cmd.botId] && bots[cmd.botId].length == 2){
            const values = bots[cmd.botId].sort((x, y) => x - y);

            if (cmd.lowKind === KIND.BOT)                
                bots = addToBot(values[0], cmd.lowId, bots);            
            else
                outputs = addToOutput(values[0], cmd.lowId, outputs);

            if (cmd.highKind === KIND.BOT)
                bots = addToBot(values[1], cmd.highId, bots);
            else
                outputs = addToOutput(values[1], cmd.highId, outputs);

            console.log("Bot", cmd.botId, "compares", values[0], "and", values[1]);

            bots[cmd.botId] = undefined;            
        }      
    }
}

function process(input){
    let toZoom = [];
    let bots = [];
    let outputs = [];

    for(const row of input){
        const cmd = row.split(" ");
        if (cmd[0] == 'value'){ 
            bots = addToBot(cmd[1], cmd[5], bots); 
        }
        else {
            toZoom = addToZoom(cmd[1], cmd[5], cmd[6], cmd[10], cmd[11], toZoom); 
        }
        checkZoomList(bots, outputs, toZoom);
    }

    while (checkBots(bots)){
        checkZoomList(bots, outputs, toZoom);
    }    
    console.log("Output result: ", outputs[0] * outputs[1] * outputs[2]);    
}

const input = fs.readFileSync("input.txt", "utf8" );
const rows = input.split(os.EOL);
process(rows);