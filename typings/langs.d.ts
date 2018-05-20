// Type definitions for langs
// Definitions by: Kevin Chiu <https:https://github.com/icemanbeta>
import * as Langs from 'langs';

// declare module 'Langs' {
//   export all(): Array<Lang>;
//   export codes(type: any): Array<string>;
//   export has(crit: string, val: string): boolean;
//   export names(local: boolean): Array<string>;
//   export where(crit: any, string: stirng): Lang;
// }

declare namespace Langs {
  export interface Lang {
    'name': string;
    'local': string;
    '1': string;
    '2': string;
    '2B': string;
    '2T': string;
    '3': string;
  }
}
