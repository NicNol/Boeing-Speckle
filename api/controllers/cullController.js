"use strict";

const mongoose = require("mongoose");
const Spec = mongoose.model("Spec");

exports.list_all_specs = function (req, res) {
    Spec.find({}, function (err, spec) {
        if (err) {
            res.status(401).send(err);
            return;
        }

        res.json(spec);
    }).clone();
};

exports.read_a_spec = function (req, res) {
    let specRegex = new RegExp(req.params.specification, "i"); //Case insensitive
    Spec.find({ specification: { $regex: specRegex } }, function (err, spec) {
        if (err) {
            console.log(err);
            res.status(402).send(err);
            return;
        }
        if (spec == null) {
            res.status(403).send({ url: req.originalUrl + " not found" });
            return;
        }
        res.json(spec);
    }).clone();
};
