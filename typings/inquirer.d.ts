/// <reference types="inquirer" />

import * as inquirer from 'inquirer';

declare global {
  export namespace Inquirer {
    export interface Question<T = Answers> {
      source(answers?: T, input: string): any;
    }
  }
}

export = inquirer;
