// Type definitions for uchardet
// Definitions by: Kevin Chiu <https:https://github.com/icemanbeta>
export = uchardet;

declare function uchardet(filename: string): string;

declare namespace uchardet {
  export const version(): string;
}
