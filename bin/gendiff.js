#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';
import formatStylish from '../src/formatters/stylish.js';
import formatPlain from '../src/formatters/plain.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    if (program.opts().format === 'stylish') {
      console.log(genDiff(filepath1, filepath2, formatStylish));
    }
    if (program.opts().format === 'plain') {
      console.log(genDiff(filepath1, filepath2, formatPlain));
    }
  })
  .parse();
