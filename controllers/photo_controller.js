'use strict';
const path = require('path');
const express = require('express');
const router = express.Router();
const PhotoModel = require('../models/photo_model');
const multer = require('multer');
const ACCEPTED_FILETYPES = [ 'image/jpeg', 'image/png' ];
const Jimp = require("jimp");
const crypto = require('crypto');
const convert = require('../lib/converter');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads/'),
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
});

const uploader = multer({ storage: storage });

router.put('/photo', uploader.single('photo'), (req, res)=> {
  if (ACCEPTED_FILETYPES.indexOf(req.file.mimetype) >= 0) {

    let extName = path.extname(req.file.filename);
    var filename = path.basename(req.file.filename, extName);

    convert(req.file.path, req.body.filter);

    let photo = new PhotoModel({
      filename: filename + extName,
      thumbnail: filename + '_thumbnail' + extName,
      authorName: req.body[ 'authorName' ],
      comment: req.body[ 'comment' ]
    });
    photo.save(function (err) {
    });

    res.json({
      photo_path: filename + extName
    });

  } else {
    res.json({
      status: 'fail'
    });
  }


});

module.exports = router;