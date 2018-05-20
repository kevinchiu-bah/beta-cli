// Type definitions for franc
// Definitions by: Kevin Chiu <https:https://github.com/icemanbeta>
import * as franc from 'franc';
// export as namespace franc;
// export = franc;
// declare function franc(value: string, options: Franc.Options): string;
// declare module 'franc' {
//   all(value: string, options: Franc.Options): Array<Yield>;
// }

declare namespace Franc {
  export type ISOCode = string;
  export type Confidence = number;
  export type Yield = Array<[ISOCode, Confidence]>

  export interface Options {
    blacklist?: Array<ISOCode>;
    whitelist?: Array<ISOCode>;
  }
}
