const {spawn} = require('child_process')
require("dotenv").config();

const detectSpaces = async ()=>{
    const pythonProcess = spawn('python', ['./cv/detection/main.py', process.env.URL]);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    
    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
    
    // Handle errors
    pythonProcess.on('error', (error) => {
        console.error(`error: ${error.message}`);
    });
    
    // Handle the close event
    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
    
    // Keep the Node.js process alive to keep the Python script running
    process.stdin.resume();
    
}


module.exports ={
    detectSpaces
}