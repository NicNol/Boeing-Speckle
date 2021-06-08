const fs = require('fs');
const request = require('request-promise-native');
const pdf = require('pdf-parse')
const lineReader = require('line-reader')
const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

async function downloadPDF(pdfURL, outputFilename) {
    let pdfBuffer = await request.get({uri: pdfURL, encoding: null});
    console.log("Writing downloaded PDF file to " + outputFilename + "...");
    fs.writeFileSync(outputFilename, pdfBuffer);
}

//downloadPDF("http://active.boeing.com/doingbiz/d14426/bac_specrev.pdf", "./files/somePDF.pdf");



//let dataBuffer = fs.readFileSync("./files/somePDF.pdf");
 
// pdf(dataBuffer).then(function(data) {
 
//     fs.writeFile("./files/pdfText.txt", data.text, function(err) {
//         if (err) return console.log(err);
//     })
        
// });

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
            stream.write(mem + "\n");
            mem = ""
            reading = false
        }

    });

}

function fileToJson() {

    output = {}
    var stream = fs.createWriteStream("./files/pdfJSON.JSON", {flags:'a'});
    //stream.write("{" + "\n");

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

        // stream.write('\t"' + specName + '": {\n');
        // stream.write('\t\t"specification": "' + specName + '",\n');
        // stream.write('\t\t"revision": "' + specRev + '",\n');
        // stream.write('\t\t"title": "' + specTitle + '",\n');
        // stream.write('\t\t"date": "' + specDate + '"\n');
        // stream.write('\t\t},\n');
    });

    

    //stream.write("}");
    

}

//fileToJson();

app.listen(port);