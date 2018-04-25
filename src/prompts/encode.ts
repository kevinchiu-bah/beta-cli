import { default as Enquirer } from 'enquirer';
import { default as fuzzy } from 'fuzzy';
import { default as Autocomplete } from 'prompt-autocompletion';
import { default as Input } from 'prompt-input';

const encodings = require('../config/encodings.json');
const search = (answers, input: string = 'UTF-8') => new Promise(resolve => {
  const fuzzyResult = fuzzy.filter(input, encodings);
  const result = fuzzyResult.map(item => <string>item.original);
  result.sort((a: string, b: string) => (a.length - b.length))

  resolve(input ? result : encodings.slice(0, 5));
});

const questions = [
  {
    name: 'path',
    message: 'Enter the path to the file to be encoded',
    validate: input => !!(input || '').length,
  },
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
];

const prompt = new Enquirer();

prompt
  .register('autocomplete', Autocomplete)
  .register('input', Input)
  .enqueue(questions);

  export { prompt };
  export { questions };
