const LIKELY = ['VERY_LIKELY', 'LIKELY', 'POSSIBLE'];
const UNLIKELY = ['VERY_UNLIKELY', 'UNLIKELY'];
const UNKNOWN = ['UNKNOWN'];

const likelyToBeHappy = ({
  joy,
  surprise
}) => {
  if (LIKELY.includes(joy) || LIKELY.includes(surprise)) {
    return true;
  }

  return false;
};

const unlikelyToBeHappy = ({
  joy,
  surprise
}) => {
  if (UNLIKELY.includes(joy) || UNLIKELY.includes(surprise)) {
    return true;
  }

  return false;
};

const likelyToBeUnhappy = ({
  anger,
  sorrow
}) => {
  if (LIKELY.includes(anger) || LIKELY.includes(sorrow)) {
    return true;
  }

  return false;
};

const unlikelyToBeUnhappy = ({
  anger,
  sorrow
}) => {
  if (UNLIKELY.includes(anger) || UNLIKELY.includes(sorrow)) {
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
  if (likelyToBeUnhappy({ anger, sorrow })) {
    return -1;
  } else if (likelyToBeHappy({ joy, surprise })) {
    return 1;
  } else if (unlikelyToBeHappy({ joy, sorrow }) && unlikelyToBeUnhappy({ anger, sorrow })) {
    return 0;
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
    faceSentiments
  };
};
