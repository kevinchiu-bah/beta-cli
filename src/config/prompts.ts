import { PromptModule } from 'inquirer';
import { indexOf, random } from 'lodash';
import { default as fuzzy } from 'fuzzy';

const prompt = (questions: Array<{}>) => {
  const inquirer = require('inquirer');
  const autocomplete = require('inquirer-autocomplete-prompt');
  const instance: PromptModule = inquirer.createPromptModule();

  instance.registerPrompt('autocomplete', autocomplete);

  return instance(questions);
};

export const BundlePrompt = prompt([
  {
    name: 'prefix',
    type: 'input',
    message: 'Enter the name of your bundle',
    default: 'The.Bundle',
  },
  {
    name: 'path',
    type: 'input',
    message: 'Enter the path to your bundle [directory]',
    validate: input => !!(input || '').length,
  },
  {
    name: 'locale',
    type: 'input',
    message: 'Enter the language suffix or your srt',
    default: 'en',
  }
]);

const encodings = require('./encodings.json');
const search = (answers, input: string = '') => new Promise(resolve => {
  const fuzzyResult = fuzzy.filter(input, encodings);
  const result = fuzzyResult.map(item => <string>item.original);

  result.sort((a: string, b: string) => (a.length - b.length))

  return resolve(result);
});

export const EncodePrompt = prompt([
  {
    name: 'to',
    type: 'autocomplete',
    message: 'Enter the encoding you would like to convert this to',
    default: 'UTF-8',
    filter: input => input.toUpperCase(),
    transformer: input => input.toUpperCase(),
    source: search,
    // validate: input => {
    //   const index = indexOf(encodings, input.toUpperCase());
    //   return (index == -1) ? `"${input.toUpperCase()}" is not valid encoding format` : true;
    // },
  },
  {
    name: 'path',
    type: 'input',
    message: 'Enter the path to the file to be encoded',
    validate: input => !!(input || '').length,
  },
]);
