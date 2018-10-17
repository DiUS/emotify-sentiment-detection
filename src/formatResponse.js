exports.formatResponse = results => {
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
    faces: faceSentiments
  };
  return resp;
};
