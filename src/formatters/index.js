import formatStylish from './stylish.js';
import formatPlain from './plain.js';

export default (diff, formatName) => {
  switch (formatName) {
    case 'stylish': {
      const result = formatStylish(diff);
      return result;
    }
    case 'plain': {
      const result = formatPlain(diff);
      return result;
    }
    case 'json': {
      const result = JSON.stringify(diff);
      return result;
    }
    default:
      throw new Error(`Unknown output format: '${formatName}'!`);
  }
};
