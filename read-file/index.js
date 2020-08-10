#!/usr/bin/env node
const fs = require('fs');
const [nodePath, scriptPath, name] = process.argv;
fs.readFile(name, (err, content) => 
    console.log(`Number of characters: ${content.length}`)
);