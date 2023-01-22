#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0');

program
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    // options = program.opts();
    if (!options.format) console.log(genDiff(filepath1, filepath2));
    else if (options.format === 'json') console.log(genDiff(filepath1, filepath2));
    else console.log('Error: unknown format, use json format');
  });

program.parse();
