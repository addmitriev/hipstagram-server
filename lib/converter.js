'use strict';
const path = require('path');
const Jimp = require("jimp");
const spawn = require('child_process').spawn;

function convert (filepath, filter) {
  let capserExecutable = path.join(__dirname, '../node_modules/.bin/casperjs');
  let converter = spawn(capserExecutable, [ path.join(__dirname, 'casper.js'), filepath, filter ]);

  let extName = path.extname(filepath);
  let filename = path.basename(filepath, extName);
  let thumbnail_path = path.join(path.dirname(filepath), filename + '_thumbnail' + extName);

  converter.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  converter.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  converter.on('close', (code) => {
    console.log(`child process exited with code ${code}`);

    Jimp.read(filepath, function (err, photo) {
      if (!err) {
        photo.resize(100, 100).quality(50).write(thumbnail_path, function (err) {
        });
      }
    });

  });
}

module.exports = convert;