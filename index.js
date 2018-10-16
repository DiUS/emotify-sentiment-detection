'use strict';

const vision = require('@google-cloud/vision');
// Creates a client
const client = new vision.ImageAnnotatorClient();

exports.http = (request, response) => {
  const uri = request.query.uri;
  if (uri == null) {
    response.status(400).json({ error: "Must include a 'uri' query parameter." });
  };

  // Performs label detection on the image file
  client
    .faceDetection(uri)
    .then(results => {
      const faces = results[0].faceAnnotations;

      const faceSentiments = faces.map((face) => {
        return {
          joy: face.joyLikelihood,
          anger: face.angerLikelihood,
          sorrow: face.sorrowLikelihood,
          surprise: face.surpriseLikelihood
        };
      });

      const resp = {
        image: uri,
        faces: faceSentiments
      };

      response.status(200).json(resp);
    })
    .catch(err => {
      console.error('ERROR:', err);
      response.status(200).send(err)
    });
};

exports.event = (event, callback) => {
  console.log(event)
  callback();
};
