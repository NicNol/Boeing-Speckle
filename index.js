const fs = require('fs');
const request = require('request-promise-native');
const pdf = require('pdf-parse');
const lineReader = require('line-reader');
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static')
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const config  = require('./config')
const Spec = require('./api/models/cullModel');

mongoose.Promise = global.Promise;
mongoose.connect(config.dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(serveStatic(path.join(__dirname, '/public'), { 'extensions': ['html'] }))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

const routes = require('./api/routes/cullRoute'); //importing route
routes(app); //register the route

async function downloadPDF(pdfURL, outputFilename) {
    let pdfBuffer = await request.get({uri: pdfURL, encoding: null});
    console.log("Writing downloaded PDF file to " + outputFilename + "...");
    fs.writeFileSync(outputFilename, pdfBuffer);
}

function downloadFile() {
    downloadPDF("http://active.boeing.com/doingbiz/d14426/bac_specrev.pdf", "./files/somePDF.pdf");
    // Probably should use a try-catch here in case the page fails to load or the URL changes.
}

function PDFtoText() {
    let dataBuffer = fs.readFileSync("./files/somePDF.pdf");
    
    pdf(dataBuffer).then(function(data) {
    
        fs.writeFile("./files/pdfText.txt", data.text, function(err) {
            if (err) return console.log(err);
        })
            
    });
}

function parseFile() {

    mem = ""
    reading = false

    lineReader.eachLine('./files/pdfText.txt', function(line) {

        let result = /BAC[0-9,-]+[A-Z]+/.test(line)
        let result_end = /[0-9]+-[A-Z]+-[0-9]+/.test(line)
        if (result) {
            reading = true
        }
        if (reading) {
            mem += line
        }
        if (reading && result_end) {
            var stream = fs.createWriteStream("./files/pdfTextParsed.txt", {flags:'a'});
            stream.write(mem.trim() + "\n");
            mem = ""
            reading = false
        }

    });

}

function fileToJson() {

    output = {}
    var stream = fs.createWriteStream("./files/pdfJSON.JSON", {flags:'a'});

    lineReader.eachLine('./files/pdfTextParsed.txt', function(line, last) {

        lineArray = line.split(' ')
        lineArrayLength = lineArray.length
        specName = lineArray[0].match(/BAC[0-9-]+/)[0]
        specRev = lineArray[0].match(/[A-Z]+$/)[0]
        specDate = lineArray[lineArrayLength - 2]
        specTitle = ""
        for (let i = 1; i < lineArrayLength - 2; i++) {
            specTitle += lineArray[i] + " "
        }
        specTitle = specTitle.slice(0, -1).replaceAll('"', "'")

        output[specName] = {
            "specification": specName,
            "revision": specRev,
            "title": specTitle,
            "date": specDate
        }

        if(last){
            console.log(output)
         }
    });
}

//fileToJson();

app.listen(port);