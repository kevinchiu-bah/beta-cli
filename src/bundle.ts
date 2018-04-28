#! /usr/bin/env node
import { default as chalk } from 'chalk';
import { renameSync } from 'fs';
import * as glob from 'glob';
import { isNil, map, pick } from 'lodash';
import { dirname, extname, isAbsolute, join, resolve } from 'path';
import { cwd, exit } from 'process';
import { exec, ls } from 'shelljs';
import { echo } from './helpers';
import { Encode } from './encode';
import { prompt } from './prompts/bundle';

interface Options {
  prefix?: string;
  source?: string;
  locale?: string;
};

interface DependencyOptions {
  glob: any,
};

export const getKey = (filename: string): string => {
  const patterns = [
    /S([0-9]+)[_.x-]?E([0-9]+)/i,
    /([0-9]+)[_.x-]([0-9]+)/i,
    /([0-9]+)[_.x-]([0-9]+)/i,
    /([0-9]+)[_.x-]([0-9]+)/i,
    /([0-9])([0-9][0-9])/,
  ];

  let matches;
  let key = null;
  let pattern;
  let intPattern;

  for(intPattern = 0; intPattern < patterns.length; intPattern++) {
    pattern = patterns[intPattern];
    matches = filename.match(pattern);

    if((matches || []).length === 3) {
      key = [
        'S',
        matches[1].padStart(2,0),
        'E',
        matches[2].padStart(2,0),
      ];

      key = key.join('');

      break;
    }
  };

  return key;
};

export class Bundle {
  private _source;
  private _prefix;
  private _locale;

  private params: DependencyOptions = {
    glob: {
      sync: true,
      cwd: cwd(),
    },
  };

  constructor(source?, prefix = 'The.Bundle') {
    this.options = {
      source,
      prefix,
    };
  }

  _mv(from: string, to: string): string {
    const rootPath = this.source;

    if(rootPath !== from) {
      // File rename
      if(!isAbsolute(from))
        from = join(rootPath, from);
      if(!isAbsolute(to))
        to = join(rootPath, to);
    } else {
      // Directory rename
      const paths = rootPath.split('/');

      paths.pop();
      paths.push(to);

      to = join.apply(paths);
    }

    renameSync(from, to);
    console.log(`${chalk.green('[Renaming]')} ${chalk.gray(from)} => ${chalk.cyan(to)}`);

    return to;
  }

  /**
   * [Getters/Setters] @source
   */
  get source(): string {
    return this._source;
  }

  set source(source: string) {
    if(!isNil(source)) {
      this._source = source;
      this.params.glob.cwd = source;
    }
  }

  /**
   * [Getters/Setters] @prefix
   */
  get prefix(): string {
    return this._prefix;
  }

  set prefix(prefix: string) {
    if(!isNil(prefix)) {
      this._prefix = prefix;
    }
  }

  /**
   * [Getters/Setters] @locale
   */
  get locale(): string {
    return this._locale;
  }

  set locale(locale: string) {
    if(!isNil(locale)) {
      this._locale = locale;
    }
  }

  get options(): Options {
    return {
      source: this._source,
      prefix: this._prefix,
      locale: this._locale,
    };
  }

  /**
   * [Getters/Setters] @options
   */
  set options(options: Options) {
    const keys = [
      'source',
      'prefix',
      'locale',
    ];

    map(pick(options, keys), (value, key) => {
      this[key] = value;
    });
  }

  resolve(to: string = './') {
    return resolve(this.source, to);
  }

  rename(from: string, to: string, suffix?: string): string {
    const ext = extname(from);
    const args = [to];

    if(suffix) {
      args.push(`.${suffix}`);
    }

    args.push(ext);
    to = args.join('.');

    return this._mv(from, to);
  }

  _single() {
    const params = this.params;
    const name = this.prefix;
    const rootPath = this.source;

    let files;

    console.log(`${chalk.cyan('\n[Bundle Type]')} Single`);

    /**
     * Cover
     */
    files = glob.sync('*.{jpg,jpeg.png}', params.glob);
    files.forEach(source => {
      this.rename(source, 'cover');
    });

    /**
     * Subs
     */
    files = glob.sync('*.{srt,ass,ssa,sub,vob}', params.glob);
    files.forEach(source => {
      const file = join(rootPath, source);
      const locale = Encode(file, { backup: false });

      if(locale) {
        this.rename(source, name, locale);
      }
    });

    /**
     * Media
     */
    files = glob.sync('*.{mp4,avi,mkv}', params.glob);
    files.forEach(source => {
      this.rename(source, name);
    });

    /**
     * Finalize
     */
    this._mv(rootPath, name);
  }

  _multi() {
    const params = this.params;
    const name = this.prefix;
    const rootPath = this.source;

    let files;

    console.log(`${chalk.cyan('\n[Bundle Type]')} Multi`);

    /**
     * Cover
     */
    files = glob.sync('*.{jpg,jpeg.png}', params.glob);
    files.forEach(source => {
      this.rename(source, 'cover');
    });

    /**
     * Subs
     */
    files = glob.sync('*.{srt,ass,ssa,sub,vob}', params.glob);
    files.forEach(source => {
      const file = join(rootPath, source);
      let suffix: any = getKey(source);

      if(suffix) {
        const args = [source, name];
        const locale = Encode(file, { backup: false });

        suffix = [suffix];

        if(locale) {
          suffix.push(locale);
        }

        suffix = suffix.join('.')
        this.rename(source, name, suffix);
      }
    });

    /**
     * Media
     */
    files = glob.sync('*.{mp4,avi,mkv}', params.glob);
    files.forEach(source => {
      const suffix = getKey(source);

      if(source) {
        this.rename(source, name, suffix);
      }
    });

    /**
     * Finalize
     */
    this._mv(rootPath, name);
  }

  run() {
    const files = glob.sync('*.{mp4,avi,mkv}');

    switch(files.length) {
      case 0:
      case 1:
        this._single();
        break;

      default:
        this._multi();
    }
  }
};

/**
 * Initializer/Bootstrap
 */
const init = () => {
  prompt
    .ask(prompt.queue)
    .then((params: any) => {
      let bundle: Bundle;
      let paths: Array<string>;

      params.path = echo(params.path);

      if(params.path) {
        bundle = new Bundle(params.path, params.prefix);
        bundle.run();
      } else {
        console.log([
          chalk.red('[Error]'),
          `${params.path} is not or does not contain any valid directories!`,
          chalk.yellow('Aborting'),
        ].join(' '));
        exit();
      }
     })
     .catch((e) => {
       console.log(e);
     });
};

export default init;
