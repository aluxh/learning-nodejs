const fs = require('fs');
const events = require('events');

class Watcher extends events.EventEmitter {
    //Extends EventEmitter method with method that processes files
    constructor(watchDir, processedDir) {
        super();
        this.watchDir = watchDir;
        this.processedDir = processedDir;
    }

    watch() {
        //Processes each file in watch directory
        fs.readdir(this.watchDir, (err, files) => {
            if (err) throw err;
            for (var index in files) {
                this.emit('process', files[index]);
            }
        });
    }

    start() {
        //Adds method to start watching
        fs.watchFile(this.watchDir, () => {
            this.watch();
        });
    }
}

module.exports = Watcher;