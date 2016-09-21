'use strict';
const express = require('express');
const router = express.Router();
const PhotoModel = require('../models/photo_model');

router.get('/', (req, res) => {
  res.json({
    status: 'ok'
  })
});

router.get('/search', (req, res)=> {
  PhotoModel.find({}).then((data)=> {
    let arr = data.map((item)=> {
      return {
        photo_path: req.protocol + '://' + req.headers[ 'host' ] + '/uploads/' + item.filename,
        thumbnail_path: req.protocol + '://' + req.headers[ 'host' ] + '/uploads/' + item.thumbnail,
        author: item.authorName,
        comment: item.comment,
        created_at: item.created_at
      }
    });
    res.json(arr);
  });
});

module.exports = router;