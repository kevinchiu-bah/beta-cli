// Type definitions for beta-cli
// Definitions by: Kevin Chiu <https:https://github.com/icemanbeta>
export namespace Printer {
  export type Message = (string | Array<string>);
  export interface Options {
    header: Message;
    body: Message;
    footer: Message;
  }
}

declare var Promise: any;

declare interface String {
  repeat: (string) => string;
  startsWith: (string) => string;
  endsWith: (string) => string;
  includes: (string) => string;
}
