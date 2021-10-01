export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  getFormattedDate,
  delay,
  isValidUrl,
  isValidImg,
};

function makeId(length = 6) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ];
  var txt = '';
  while (size > 0) {
    size--;
    txt += words[Math.floor(Math.random() * words.length)] + ' ';
  }
  return txt;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function delay(ms = 1500) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

function getFormattedDate(timestamp, isWithTime) {
  if (!timestamp) return '';
  let options = { month: 'short', day: 'numeric' };
  if (isWithTime) options = { ...options, hour: '2-digit', minute: '2-digit' };
  return new Date(timestamp).toLocaleString('en-US', options).replace(',', ' at');
}

function isValidUrl(txt) {
  const urlExp =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
  return urlExp.test(txt);
}

function isValidImg(filename) {
  return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(filename);
}

