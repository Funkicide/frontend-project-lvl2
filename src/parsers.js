import YAML from 'yaml';

export default (data, dataFormat) => {
  if (dataFormat === '' || dataFormat === 'json') {
    return JSON.parse(data);
  }
  if (dataFormat === 'yml' || dataFormat === 'yaml') {
    return YAML.parse(data);
  }

  throw new Error(`Unknown data format: '${dataFormat}'!`);
};
