// Type definitions for Enquirer
// Definitions by: Kevin Chiu <https:https://github.com/icemanbeta>
export = Enquirer;

declare class Enquirer {
  constructor(options: any);
  addEventListener(event: any, fn: any): any;
  ask(questions: any): any;
  emit(event: any, ...args: any[]): any;
  enqueue(questions: any): any;
  get(name: any): any;
  has(name: any): any;
  hasListeners(event: any): any;
  init(): void;
  lazyInit(): void;
  listeners(event: any): any;
  off(event: any, fn: any, ...args: any[]): any;
  on(event: any, fn: any): any;
  once(event: any, fn: any, ...args: any[]): any;
  prompt(name: any, ...args: any[]): any;
  question(name: any, message: any, options: any, ...args: any[]): any;
  register(type: any, PromptType: any): any;
  removeAllListeners(event: any, fn: any, ...args: any[]): any;
  removeEventListener(event: any, fn: any, ...args: any[]): any;
  removeListener(event: any, fn: any, ...args: any[]): any;
  separator(options: any): any;
  set(...args: any[]): any;
  use(fn: any): any;
  visit(method: any, val: any): any;
}

declare namespace Enquirer {
  interface Options {
    [key: string]: any;
  }

  interface Question {
    name?: string;
    type?: string;
    default?: string|number;
    message: string;
    filter?(input: string): string;
    source?(answers: any, input: string): Promise<Array<string>>;
    transformer?(input: string): string;
    validate?(input: string): boolean;
  }

  class Plugin extends Enquirer {
    render(state: any): void;
  }

  class Separator {
    constructor(options: any);
    raw(): any;
    render(): any;
    toString(): any;
    static exclude(choice: any): any;
  }
}
