import YAML from 'yaml';

export default (data, fileExt) => {
  if (fileExt === '' || fileExt === '.json') {
    return JSON.parse(data);
  }
  if (fileExt === '.yml' || fileExt === '.yaml') {
    return YAML.parse(data);
  }

  return console.log('Error: Unknown file extension');
};
