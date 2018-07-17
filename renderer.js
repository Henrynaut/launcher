/*
 create an object from the fs module
 */
const fs = require('fs');

/*
 fs module provides a method readdir() which takes, as parameter, the path of the directory, and a callback of what we want to do with the obtained files.
 Here we give it the current directory as the path
 NOTE: The path will always:
 1. Contain the full path, e.g /home/username/Desktop/....to read the Desktop. The full path always starts from the root
 2. Append a slash at the end of the path. e.g /home/username/Desktop should have the / at the end to be /home/username/Desktop/
 */
fs.readdir('.', (err, files) => {
    'use strict';
    //if an error is thrown when reading the directory, we throw it. Otherwise we continue
    if (err) throw  err;
    //the files parameter is an array of the files and folders in the path we passed. So we loop through the array, printing each file and folder
    for (let file of files) {
        console.log(file);
    }
});