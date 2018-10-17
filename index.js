'use strict';

const { formatResponse } = require('./src/formatResponse');

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

const handleGET = (req, res) => {
  const uri = req.query.uri;
  if (uri == null) {
    res.status(400).json({ error: "Must include a 'uri' query parameter." });
  };

  client
    .faceDetection(uri)
    .then(formatResponse)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.error('ERROR:', err);
      res.status(200).send(err)
    });
}

const handlePOST = (req, res) => {
  const { content } = req.body;

  if (!content) {
    res.status(400).json({ error: "Must include a 'content' in request body" });
  };

  client
    .faceDetection({
      'image': {'content': content},
    })
    .then(formatResponse)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.error('ERROR:', err);
      res.status(200).send(err)
    });
}

exports.http = (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    // Set CORS headers for the main request
    res.set('Access-Control-Allow-Origin', '*');
  }

  switch (req.method) {
    case 'GET':
      handleGET(req, res);
      break;
    case 'POST':
      handlePOST(req, res);
      break;
    default:
      res.status(500).send({ error: 'Something blew up!' });
      break;
  }
};

exports.event = (event, callback) => {
  console.log(event)
  callback();
};
