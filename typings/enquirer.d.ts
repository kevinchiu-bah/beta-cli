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

  // namespace Separator {
  //   namespace exclude {
  //     const prototype: {};
  //   }
  //
  //   namespace prototype {
  //     raw(): any;
  //     render(): any;
  //     toString(): any;
  //
  //     raw {
  //       const prototype: {};
  //     }
  //
  //     namespace render {
  //       const prototype: {};
  //     }
  //
  //     namespace toString {
  //       const prototype: {};
  //     }
  //   }
  // }

//   namespace prototype {
//     function addEventListener(event: any, fn: any): any;
//     function ask(questions: any): any;
//     function emit(event: any, ...args: any[]): any;
//     function enqueue(questions: any): any;
//     function get(name: any): any;
//     function has(name: any): any;
//     function hasListeners(event: any): any;
//     function init(): void;
//     function lazyInit(): void;
//     function listeners(event: any): any;
//     function off(event: any, fn: any, ...args: any[]): any;
//     function on(event: any, fn: any): any;
//     function once(event: any, fn: any, ...args: any[]): any;
//     function prompt(name: any, ...args: any[]): any;
//     function question(name: any, message: any, options: any, ...args: any[]): any;
//     function register(type: any, PromptType: any): any;
//     function removeAllListeners(event: any, fn: any, ...args: any[]): any;
//     function removeEventListener(event: any, fn: any, ...args: any[]): any;
//     function removeListener(event: any, fn: any, ...args: any[]): any;
//     function separator(options: any): any;
//     function set(...args: any[]): any;
//     function use(fn: any): any;
//     function visit(method: any, val: any): any;
//
//     namespace addEventListener {
//       const prototype: {};
//     }
//
//     namespace ask {
//       const prototype: {};
//     }
//
//     namespace emit {
//       const prototype: {};
//     }
//
//     namespace enqueue {
//       const prototype: {};
//     }
//
//     namespace get {
//       const prototype: {};
//     }
//
//     namespace has {
//       const prototype: {};
//     }
//
//     namespace hasListeners {
//       const prototype: {};
//     }
//
//     namespace init {
//       const prototype: {};
//     }
//
//     namespace lazyInit {
//       const prototype: {};
//     }
//
//     namespace listeners {
//       const prototype: {};
//     }
//
//     namespace off {
//       const prototype: {};
//     }
//
//     namespace on {
//       const prototype: {};
//     }
//
//     namespace once {
//       const prototype: {};
//     }
//
//     namespace prompt {
//       const prototype: {};
//     }
//
//     namespace question {
//       const prototype: {};
//     }
//     namespace register {
//       const prototype: {};
//     }
//
//     namespace removeAllListeners {
//       const prototype: {};
//     }
//
//     namespace removeEventListener {
//       const prototype: {};
//     }
//
//     namespace removeListener {
//       const prototype: {};
//     }
//
//     namespace separator {
//       const prototype: {};
//     }
//
//     namespace set {
//       const prototype: {};
//     }
//
//     namespace use {
//       const prototype: {};
//     }
//
//     namespace visit {
//       const prototype: {};
//     }
//   }
// }
