import { default as Enquirer } from 'enquirer';
import { default as Input } from 'prompt-input';

const questions = [
  {
    name: 'prefix',
    message: 'Enter the name of your bundle',
    default: 'The.Bundle',
  },
  {
    name: 'path',
    message: 'Enter the path to your bundle [directory]',
    validate: input => !!(input || '').length,
  },
];

const prompt = new Enquirer();

prompt
  .register('input', Input)
  .enqueue(questions);

export { prompt };
export { questions };
