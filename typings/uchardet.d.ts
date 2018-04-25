export = uchardet;

declare function uchardet(filename: string): string;

declare namespace uchardet {
  export const version(): string;
}
