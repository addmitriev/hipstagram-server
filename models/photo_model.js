'use strict';
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Photo = new Schema({
  filename: { type: String, required: true },
  thumbnail: { type: String, required: true },
  authorName: { type: String, required: true },
  comment: { type: String, maxLength: 160 },
  likes: { type: Number },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Photo', Photo);