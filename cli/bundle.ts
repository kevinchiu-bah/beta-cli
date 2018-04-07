#! /usr/bin/env node
import * as chalk from 'chalk';
import * as fs from 'fs';
import * as glob from 'glob';
import * as inquirer from 'inquirer';
import { isNil, map, pick } from 'lodash';
import * as path from 'path';
import * as process from 'process';
import { env, exec, ls } from 'shelljs';
// import { encode } from './encode';

const mv = (source, target) => {
  fs.renameSync(source, target);
  console.log(`${chalk.green('[Renaming]')} ${chalk.gray(source)} => ${chalk.cyan(target)}`);
};

interface Options {
  prefix?: string;
  source?: string;
  locale?: string;
};

interface DependencyOptions {
  glob: G.IOptions,
};

class Bundle {
  private _source;
  private _prefix;
  private _locale;

  private params: DependencyOptions = {
    glob: {
      sync: true,
      cwd: process.cwd(),
    },
  };

  constructor(source?, prefix = 'The.Bundle', locale = 'en') {
    this.options = {
      source,
      prefix,
      locale,
    };
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

  set prefix(prefix = 'en') {
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

  set locale(locale: string = null) {
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
  set options(options: Options = {}) {
    const keys = [
      'source',
      'prefix',
      'locale',
    ];

    map(pick(options, keys), (value, key) => {
      this[key] = value;
    });
  }

  _single() {
    const params = this.params;
    const cwd = this.source;
    const prefix = this.prefix;
    const locale = this.locale;

    let files;
    let basePath;
    let target;
    let ext;
    let dir$;

    files = glob.sync('*.{jpg,jpeg.png}', params.glob);
    files.forEach(source => {
      basePath = path.dirname(path.join(cwd, source));
      source = `${basePath}/${source}`;
      ext = path.extname(source);
      target = `${basePath}/cover${ext}`;
      mv(source, target);
    });

    files = glob.sync('*.{srt,ass,ssa,sub,vob}', params.glob);
    files.forEach(source => {
      basePath = path.dirname(path.join(cwd, source));
      source = `${basePath}/${source}`;
      ext = path.extname(source);
      target = `${basePath}/${prefix}.${locale}${ext}`;
      mv(source, target);
      // encode(target);
      // fs.unlinkSync(source);
    });

    files = glob.sync('*.{mp4,avi,mkv}', params.glob);
    files.forEach(source => {
      basePath = path.dirname(path.join(cwd, source));
      source = `${basePath}/${source}`;
      ext = path.extname(source);
      target = `${basePath}/${prefix}${ext}`;
      mv(source, target);
    });

    dir$ = cwd.split('/');
    dir$.pop();
    dir$.push(prefix)
    dir$ = dir$.join('/');

    mv(cwd, dir$);
  }

  _multi() {
    console.log(`${chalk.yellow('[Warning]')} This method has not been implemented yet! Exiting.`);
    process.exit();
  }


  run() {
    glob('*.{mp4,avi,mkv}', (error, files) => {
      switch(files.length) {
        case 0:
        case 1:
          console.log(`${chalk.cyan('\n[Bundle Type]')} Single`);
          this._single();
          break;

        default:
          console.log(`${chalk.cyan('\n[Bundle Type]')} Multi`);
          this._multi();
      }
    });
  }
};

/**
 * Initializer/Bootstrap
 */
const init = () => {
  inquirer.prompt([
    {
      name: 'prefix',
      message: 'Enter the name of your bundle',
      default: 'The.Bundle',
    },
    {
      name: 'path',
      message: 'Enter the path to your bundle [directory]',
      validate: answer => !!(answer || '').length,
    },
    {
      name: 'locale',
      message: 'Enter the language suffix or your srt',
      default: 'en',
    }
  ]).then(params => {
    const bundle: Bundle;
    const vars = params.path.match(/\$[a-z0-9]+/ig);
    const options: ExecOptions = {
      silent: true,
    };

    if(vars) {
      vars.forEach(key => {
        const key$ = key.replace(/^\$/g, '');
        const value$ = env[key$];

        if(value$) {
          params.path = params.path.replace(key, value$);
        }
      });
    }

    // Santize the user's path input
    // 1. Remove extra slashes
    // 2. Remove trailing slashes
    params.path = params.path
      .replace(/\/\/+/g, '/')
      .replace(/\/$/g, '');

    const paths = glob.sync(`${params.path}/`, { absolute: true });

    if(paths.length) {
      params.path = paths[0];
      bundle = new Bundle(params.path, params.prefix, params.locale);
      bundle.run();
    } else {
      console.log([
        chalk.red('[Error]'),
        `${params.path} is not or does not contain any valid directories!`,
        chalk.yellow('Aborting'),
      ].join(' '));
      process.exit();
    }
   }).catch((e) => {
     console.log(e);
   });
};

export default init;
