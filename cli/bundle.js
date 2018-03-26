#! /usr/bin/env node
import glob from 'glob';
import fs from 'fs';
import path from 'path';
import process from 'process';
import colors from 'colors';

const mv = (source, target) => {
  fs.renameSync(source, target);
  console.log(
    `${colors.green('[Renaming]')} ${colors.gray(source)} => ${colors.cyan(target)}`
  );
};

const bundle = (dirname, program) => {
  console.log(path.resolve(dirname));
  const cwd = path.resolve(process.cwd(), dirname);
  const prefix = program.name;
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

  if(!prefix) {
    program.outputHelp();
  }

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
    locale = 'en';
    target = `${basePath}/${prefix}.${locale}${ext}`;
    mv(source, target);
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

export default bundle;