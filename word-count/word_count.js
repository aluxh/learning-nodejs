//Parallel flow control implemented in a simple application to count the number of times a word appear in the file.
const fs = require('fs');
const tasks = [];
const wordCounts = {};
const fileDir = './text';
let completedTasks = 0;

function checkIfComplete() {
    completedTasks++;
    if (completedTasks === tasks.length) {
        for (let index in wordCounts) {
            //When all tasks have completed, list each word used in the files and the number of times it was used.
            console.log(`${index}: ${wordCounts[index]}`);
        }
    }
}
function addWordCount(word) {
    //If word exists, increment by 1 else, set to 1.
    wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
}
function countWordsInText(text) {
    const words = text.toString()
                        .toLowerCase()
                        .split(/\W+/)
                        .sort();
    
    words.filter(word => word)
        .forEach(word => addWordCount(word)); //counts word occurrences in text
}
fs.readdir(fileDir, (err, files) => { //Get a list of the files in the directory
    if (err) throw err;
    files.forEach(file => {
        const task = (file => { //Define a task to handle each file. Each task includes a call to a function that will asynchronously read and then count the file's word usage
            return () => {
                fs.readFile(file, (err, text) => {
                    if (err) throw err;
                    countWordsInText(text);
                    checkIfComplete();
                });
            };
        })(`${fileDir}/${file}`);
        tasks.push(task); //Adds each task to an array of functions to call in parallel
    });
    tasks.forEach(task => task()); //Starts executing every task in parallel
});