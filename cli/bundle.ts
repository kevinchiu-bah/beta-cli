#! /usr/bin/env node
import * as chalk from 'chalk';
import * as fs from 'fs';
import * as glob from 'glob';
import * as inquirer from 'inquirer';
import { map } from 'lodash';
import * as path from 'path';
import * as process from 'process';
import { env } from 'shelljs';
// import { encode } from './encode';

const mv = (source, target) => {
  fs.renameSync(source, target);
  console.log(`${chalk.green('[Renaming]')} ${chalk.gray(source)} => ${chalk.cyan(target)}`);
};

const bundle = (dirname, prefix, locale) => {
  const cwd = path.resolve(process.cwd(), dirname);
  const options = {
    cwd: cwd,
    sync: true,
  };

  let files;
  let basePath;
  let target;
  let ext;
  let locale;
  let dir$;

  files = glob.sync('*.{jpg,jpeg.png}', options);
  files.forEach(source => {
    basePath = path.dirname(path.join(cwd, source));
    source = `${basePath}/${source}`;
    ext = path.extname(source);
    target = `${basePath}/cover${ext}`;
    mv(source, target);
  });

  files = glob.sync('*.{srt,ass,ssa,sub,vob}', options);
  files.forEach(source => {
    basePath = path.dirname(path.join(cwd, source));
    source = `${basePath}/${source}`;
    ext = path.extname(source);
    target = `${basePath}/${prefix}.${locale}${ext}`;
    mv(source, target);
    // encode(target);
    // fs.unlinkSync(source);
  });

  files = glob.sync('*.{mp4,avi,mkv}', options);
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
};

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
  ]).then(answers => {
    const vars = answers.path.match(/\$[a-z0-9]+/i);

    if(vars) {
      vars.forEach(key => {
        const key$ = key.replace(/^\$/, '');
        const value$ = env[key$];

        if(value$) {
          answers.path = answers.path.replace(key, value$);
        }
      });

      bundle(answers.path, answers.prefix, answers.locale);
    }
   }).catch((e) => { console.log(e); });
};

export default init;
