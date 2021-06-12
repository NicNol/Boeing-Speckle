'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let SpecSchema = new Schema({
    specification: {
    type: String,
  },
  revision: {
    type: String,
  },
  title: {
    type: String,
  },
  date: {
    type: String,
  }
}, {collection: 'bac'});

module.exports = mongoose.model('Spec', SpecSchema);