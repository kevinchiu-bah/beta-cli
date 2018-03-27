import * as fs from 'fs';
import * as path from 'path';
import * as writePkg from 'write-pkg'
import * as settings from '../package.json';

const config = {
  src: './runner',
  target: path.resolve('./package.json'),
  extensions: [
    'js',
  ],

  blacklist: [
    'index.js',
  ],

  template: 'npx babel-node [src] [key]',
};

const getScriptName = (script) => script.replace(/(.+)\.js$/, '$1');

export const sync = () => {
  const pattern = new RegExp(`^(.+)\.${config.extensions.join('|')}$`),
        scripts = fs
          .readdirSync(config.src)
          .filter(file =>
            (pattern.test(file) && !config.blacklist.includes(file))
          );

  let intUpdated = 0;

  config.template = config.template.replace('[src]', config.src);

  scripts.forEach(script => {
    const key = getScriptName(script);

    if(!settings.scripts[key]) {
      intAdded++;
      settings.scripts[key] = config.template.replace('[key]', key);

      console.info(`Added '${key}' to configuration!`);
    }
  });

  if(intUpdated) {
    writePkg(config.target, settings).then(() => {
    	console.info('package.json was successfully updated!');
    });
  } else {
    console.info('Your package.json is update to date!');
  }
};
