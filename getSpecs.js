const pdf = require("pdf-parse");
const fetch = require("node-fetch");

async function getPdfBuffer(pdfURI) {
  try {
    const response = await fetch(pdfURI);
    const buffer = await response.buffer();
    return buffer;
  } catch (error) {
    console.log(error);
  }
}

async function getPdfAsString(pdfBuffer) {
  try {
    const pdfData = await pdf(pdfBuffer);
    return pdfData.text;
  } catch (error) {
    console.log(error);
  }
}

function getBacDatafromString(inputString) {
  const inputLines = inputString.split("\n");
  let BacData = [];
  let BacString = "";
  let reading = false;

  for (const line of inputLines) {
    let result = /BAC[0-9,-]+[A-Z]+/.test(line);
    let result_end = /[0-9]+-[A-Z]+-[0-9]+/.test(line);

    if (result) {
      reading = true;
    }
    if (reading) {
      BacString += line;
    }
    if (reading && result_end) {
      BacData.push(BacString.replace(/\s+/g, " ").trim());
      BacString = "";
      reading = false;
    }
  }

  return BacData;
}

function getBacJsonFromList(inputList) {
  let BacJSON = {};

  for (const spec of inputList) {
    let specObject = getSpecAsJSON(spec);
    BacJSON[specObject["specification"]] = specObject;
  }

  return BacJSON;
}

function getSpecAsJSON(spec) {
  const specArray = spec.split(" ");
  const specArrayLength = specArray.length;

  const specName = specArray[0].match(/BAC[0-9-]+/)[0];
  const specRev = specArray[0].match(/[A-Z]+$/)[0];
  const specDate = specArray[specArrayLength - 2];

  let specTitle = "";
  for (let i = 1; i < specArrayLength - 2; i++) {
    specTitle += specArray[i] + " ";
  }
  console.log(specTitle);
  specTitle = specTitle.slice(0, -1);
  specTitle = specTitle.replace(/'"'/g, "'");

  const output = {
    specification: specName,
    revision: specRev,
    title: specTitle,
    date: specDate,
  };

  return output;
}

async function getBacJson() {
  try {
    const specURI = "http://active.boeing.com/doingbiz/d14426/bac_specrev.pdf";

    console.log("Downloading PDF...");
    const stream = await getPdfBuffer(specURI);

    console.log("Converting PDF to string...");
    const dataString = await getPdfAsString(stream);

    console.log("Removing unwanted data from string...");
    const BacSpecsList = getBacDatafromString(dataString);

    console.log("Converting string to JSON...");
    return getBacJsonFromList(BacSpecsList);
  } catch (e) {
    console.log(e);
  }
}

getBacJson().then((data) => console.log(data));
