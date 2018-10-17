const isHappy = ({
  joy,
  surprise
}) => {
  if (
    joy === 'VERY_LIKELY'
    || joy === 'LIKELY'
    || surprise === 'VERY_LIKELY'
    || surprise === 'LIKELY'
  ) {
    return true;
  }

  return false;
};

const isUnhappy = ({
  anger,
  sorrow
}) => {
  if (
    anger === 'VERY_LIKELY'
    || anger === 'LIKELY'
    || sorrow === 'VERY_LIKELY'
    || sorrow === 'LIKELY'
  ) {
    return true;
  }

  return false;
};

const convertSentimentsToHappyIndex = ({
  joy,
  anger,
  sorrow,
  surprise
}) => {
  if (isHappy({ joy, surprise })) {
    return 1;
  } else if (isUnhappy({ anger, sorrow })) {
    return -1;
  }

  return 0;
};

exports.formatResponse = results => {
  const faces = results[0].faceAnnotations;

  const faceSentiments = faces.map((face) => {
    const sentiments = {
      joy: face.joyLikelihood,
      anger: face.angerLikelihood,
      sorrow: face.sorrowLikelihood,
      surprise: face.surpriseLikelihood
    };
    const happyIndex = convertSentimentsToHappyIndex(sentiments);

    return Object.assign(sentiments, { happyIndex });
  });

  return {
    faces: {
      faceSentiments
    }
  };
};
