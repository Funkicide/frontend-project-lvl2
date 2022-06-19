import formatStylish from './stylish.js';
import formatPlain from './plain.js';

export default (diff, formatName) => {
  let result;
  switch (formatName) {
    case 'stylish':
      result = formatStylish(diff);
      break;
    case 'plain':
      result = formatPlain(diff);
      break;
    case 'json':
      result = JSON.stringify(diff);
      break;
    default:
      console.warn('Unknown output format');
  }

  return result;
};
