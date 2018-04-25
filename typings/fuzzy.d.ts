// Type definitions for fuzzy
// Definitions by: Kevin Chiu <https:https://github.com/icemanbeta>
/// <reference types="fuzzy" />

export = fuzzy;

declare namespace fuzzy {
  type Pattern = string|RegExp;

  interface FuzzyOptions {
    pre?: string;
    post?: string;
    extract?: (el: any): any;
  }

  interface FilterResult {
    string: string;
    index: number;
    score: number;
    original: string;
  }

  export const filter(pattern: Pattern, arr: Array<string>, opts?: FuzzyOptions): Array<{}>;
}
