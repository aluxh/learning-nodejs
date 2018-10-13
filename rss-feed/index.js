//Serial Flow Control Implemented in a simple application
const fs = require('fs');
const request = require('request');
const htmlparser = require('htmlparser');
const configFilename = './rss_feeds.txt';

function checkForRSSFile() {
    //Task 1: Make sure that the file containing the list of RSS feed URLs exists
    fs.exists(configFilename, (exists) => {
        if (!exists) return next(new Error(`Missing RSS file: ${configFilename}`));
        next(null, configFilename);
    });
}
function readRSSFile(configFilename) {
    //Task 2: Read and parse the file containing the feed URL
    fs.readFile(configFilename, (err, feedList) => {
        if (err) return next(err);
        //console.log(`First log: ${feedList.toString()}`);
        feedList = feedList.toString()
                            .replace(/^\s+|\s+$/g, '')
                            .split('\n');
        //console.log(`Second log: ${feedList}`);
        const random = Math.floor(Math.random() * feedList.length);
        //console.log(`Third log: ${feedList[random]}\n`);
        next(null, feedList[random]);   
    });
}
function downloadRSSFeed(feedUrl) {
    //Task 3: Do an HTTP request and get data for the selected feed
    request({ uri: feedUrl }, (err, res, body) => {
        if (err) return next(err);
        //console.log(`Fourth log: status code is ${res.statusCode}`);
        if (res.statusCode !== 200) return next(new Error('Abnormal response status code'));
        next(null, body);
    });
}
function parseRSSFeed(rss) {
    //Task 4: Parse RSS data into the array of items
    const handler = new htmlparser.RssHandler();
    const parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);
    if (!handler.dom.items.length) return next(new Error('No RSS items found'));
    const item = handler.dom.items.shift();
    //Display title and URL of the first feed item, if it exists
    console.log(item.title);
    console.log(item.link);
}
const tasks = [
    //Adds each task to be performed to an array in execution order
    checkForRSSFile,
    readRSSFile,
    downloadRSSFeed,
    parseRSSFeed
];
function next(err, result) {
    //A function called next executes each task
    if (err) throw err; //throws exception if task encounters an error
    const currentTask = tasks.shift(); //Next task comes from the array of tasks
    if (currentTask) {
        currentTask(result); //Executes current task
    }
}
next(); //starts serial execution of tasks
