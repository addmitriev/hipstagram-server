'use strict';
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promise = require('promise');
const express = require('express');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/hipstagram';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

module.exports = (app) => {
  const env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use('/uploads', express.static('uploads'));
};