const pdf = require("pdf-parse");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const model = require("./api/models/cullModel");
const config = require("./config");
const dbURI = process.env.dbURI || config.dbURI;

mongoose.Promise = global.Promise;
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

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
    const specDate = specArray[specArrayLength - 1];

    let specTitle = "";
    for (let i = 1; i < specArrayLength - 1; i++) {
        specTitle += specArray[i] + " ";
    }
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

async function getSpecs(keepAlive = true) {
    const attempts = 3;
    for (let i = 0; i < attempts; i++) {
        try {
            const json = await getBacJson();
            const updates = await pushJsonToDatabase(json);
            const closeDB = await closeDatabaseConnection(updates, keepAlive);
            return closeDB;
        } catch {}
    }
}

async function getBacJson() {
    try {
        const specURI =
            "http://active.boeing.com/doingbiz/d14426/bac_specrev.pdf";

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

async function pushJsonToDatabase(json) {
    try {
        const BacSpecs = Object.keys(json);
        console.log(`Found ${BacSpecs.length} specs...`);

        let updates = { error: 0, new: 0, update: 0, "no action": 0 };

        for (const BacSpec of BacSpecs) {
            const currentSpec = json[BacSpec];
            let output = await processSpec(currentSpec);
            updates[output]++;
        }

        return updates;
    } catch (error) {
        console.log(error);
    }
}

async function processSpec(spec) {
    const specName = spec["specification"];
    let response = "no action";

    const query = await model
        .find({ specification: specName }, (err, data) => {
            if (err) {
                console.log(err);
                response = "error";
            }

            let dbSpec = data.filter(
                (specObject) => specObject["specification"] === specName
            );
            // If database doesn't have the spec, create it.
            if (dbSpec.length == 0) {
                response = "new";
                model.create(spec);
            }

            // If database doesn't have the latest data, update it.
            else if (dbSpec["revision"] != spec["revision"]) {
                response = "update";
                model
                    .findByIdAndUpdate(
                        dbSpec._id,
                        { ...dbSpec, revision: spec["revision"] },
                        (error, data) => {
                            if (error) {
                                console.log(error);
                            }
                        }
                    )
                    .clone();
            }
        })
        .clone();

    return response;
}

async function closeDatabaseConnection(updates, keepAlive = true) {
    let errors_count = updates["error"];
    let new_specs_count = updates["new"];
    let updated_specs_count = updates["update"];
    new_specs_count &&
        console.log(
            `Added ${new_specs_count} new specifications to the database...`
        );
    updated_specs_count &&
        console.log(
            `Updated ${updated_specs_count} specifications in the database...`
        );
    errors_count && console.log(`Found ${errors_count} errors...`);

    await Promise.all(
        mongoose
            .modelNames()
            .map((model) => mongoose.model(model).ensureIndexes())
    ).then(() => (keepAlive ? null : mongoose.disconnect()));
}

module.exports = getSpecs;
