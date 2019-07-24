const express = require('express')
const sg = require('simple-git')(".")
const depcruise = require('dependency-cruiser').cruise
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3000
const repoCacheBasePath = process.cwd();

app.get('/api', (req, res) => {
    console.log("Prcoessing for ");
    console.log(req.query);
    processRequest(req.query.url, req.query.format, res);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function processRequest(url, outputMode, res){
    var repoName = url.split('/')[4]
    if(repoName.indexOf('?')!= -1){
        repoName = repoName.split('?')[0];
    }
    let repoPath = path.join(repoCacheBasePath,repoName);
    let subFolderPath = '';
    if(url.split('/').length>5 && url.split('/')[5]=="tree"){
        subFolderPath = url.split('/').splice(7).join('/');
    }
    if(!fs.existsSync(repoPath)) {
        console.log("Cloning repo")
        sg.clone(url+".git",undefined, undefined, ()=>{ processRepo(repoPath, outputMode, res, subFolderPath) });
    }
    else{
        processRepo(repoPath, outputMode, res, subFolderPath);
    }
}

function processRepo(repoPath, outputMode, res, subFolderPath=''){
    console.log("Decruising on "+path.join(repoPath, subFolderPath))
    let dependencies = depcruise([path.join(repoPath, subFolderPath)], {
        exclude: "^node_modules|^.git",
        outputType: outputMode || "html"
    });

    console.log(dependencies.modules);
    res.send(dependencies.modules);
}