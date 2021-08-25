const fs = require("fs");
const request = require("request-promise-native");
const pdf = require("pdf-parse");
const lineReader = require("line-reader");
const readline = require("readline");

async function getPdfStream(pdfURL) {
  return (pdfBuffer = await request.get({ uri: pdfURL, encoding: null }));
}

function convertPDFStreamtoTextStream(pdfStream) {
  pdf(pdfStream).then(function (data) {
    parseFile(data.text);
  });
}

async function parseFile(inputStream) {
  mem = "";
  reading = false;

  const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    let result = /BAC[0-9,-]+[A-Z]+/.test(line);
    let result_end = /[0-9]+-[A-Z]+-[0-9]+/.test(line);
    if (result) {
      reading = true;
    }
    if (reading) {
      mem += line;
    }
    if (reading && result_end) {
      var stream = fs.createWriteStream("./files/pdfTextParsed.txt", {
        flags: "a",
      });
      stream.write(mem.trim() + "\n");
      mem = "";
      reading = false;
    }
  }
}

function fileToJson() {
  output = {};
  var stream = fs.createWriteStream("./files/pdfJSON.JSON", { flags: "a" });

  lineReader.eachLine("./files/pdfTextParsed.txt", function (line, last) {
    lineArray = line.split(" ");
    lineArrayLength = lineArray.length;
    specName = lineArray[0].match(/BAC[0-9-]+/)[0];
    specRev = lineArray[0].match(/[A-Z]+$/)[0];
    specDate = lineArray[lineArrayLength - 2];
    specTitle = "";
    for (let i = 1; i < lineArrayLength - 2; i++) {
      specTitle += lineArray[i] + " ";
    }
    specTitle = specTitle.slice(0, -1).replaceAll('"', "'");

    output[specName] = {
      specification: specName,
      revision: specRev,
      title: specTitle,
      date: specDate,
    };

    if (last) {
      console.log(output);
    }
  });
}

async function getSpecs() {
  console.log("Downloading PDF");
  const stream = await getPdfStream(
    "http://active.boeing.com/doingbiz/d14426/bac_specrev.pdf"
  );

  console.log("Converting to .text file");
  convertPDFStreamtoTextStream(stream);
  //parseFile();
  //fileToJson();
}

getSpecs();
