// Type definitions for beta-cli
// Definitions by: Kevin Chiu <https:https://github.com/icemanbeta>
export = Printer;

declare class Printer {
  static info(message: Message, header: string): void;
  static success(message: Message, header: string): void;
  static warn(message: Message, header: string): void;
  static error(message: Message, header: string): void;
}

declare namespace Printer {
  type Message = (string | Array<string>);

  export interface Options {
    header: Message;
    body: Message;
    footer: Message;
  }
}

declare var Promise: any;
