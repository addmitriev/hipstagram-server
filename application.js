'use strict';
const express = require('express');
const app = express();
const port = process.env.port || 8081;
const glob = require('glob');
require(__dirname + '/config/main')(app);

glob.sync(__dirname + '/controllers/**/*_controller.js').forEach((controller)=>{
  app.use(require(controller));
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`App is running on ${port}...`)
});