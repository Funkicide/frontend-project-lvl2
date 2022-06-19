#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    if (options.format === 'stylish') {
      console.log(genDiff(filepath1, filepath2, 'stylish'));
    } else if (options.format === 'plain') {
      console.log(genDiff(filepath1, filepath2, 'plain'));
    } else if (options.format === 'json') {
      console.log(genDiff(filepath1, filepath2, 'json'));
    } else {
      console.warn('error: unknown output format');
    }
  })
  .parse();
