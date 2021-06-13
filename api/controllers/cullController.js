'use strict';

const mongoose = require('mongoose');
const Spec = mongoose.model('Spec');

exports.list_all_specs = function(req, res) {
  Spec.find({}, function(err, spec) {
    if (err)
      res.send(err);
    res.json(spec);
  });
};

// exports.create_a_spec = function(req, res) {
//   var new_spec = new Spec(req.body);
//   new_spec.save(function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };

exports.read_a_spec = function(req, res) {
  let specRegex = new RegExp(req.params.specification, "i") //Case insensitive
  Spec.find({specification: {$regex: specRegex}}, function(err, spec) {
    if (err) {
      res.send(err);
    }
    if (spec == null) {
      res.status(500).send({url: req.originalUrl + ' not found'})
    }
    res.json(spec);
  });
};

// exports.update_a_spec = function(req, res) {
//   Spec.findOneAndUpdate({_id: req.params.specId}, req.body, {new: true}, function(err, spec) {
//     if (err)
//       res.send(err);
//     res.json(spec);
//   });
// };

