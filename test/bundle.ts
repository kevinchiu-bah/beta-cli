import anyTest, { TestInterface } from 'ava';
import { readdirSync, readFileSync, statSync }  from 'fs';
import { keys, map, merge } from 'lodash';
import mockFs from 'mock-fs';
import { resolve } from 'path';

import { Bundle, getKey } from '../src/bundle';

interface Context {
  bundle?: Bundle
};

const cwd = '/var/run';
const test = anyTest as TestInterface<Context>;

test.beforeEach(t => {
  t.context = {
    bundle: new Bundle(cwd),
  }
});

test('Evaluates relative paths', t => {
  const bundle = t.context.bundle;
  const paths = {
    './test.srt': '/var/run/test.srt',
    './': '/var/run',
    '.': '/var/run',
    '../': `/var`,
  };

  t.plan(keys(paths).length);

  map(paths, (resolved, path) => {
    path = bundle.resolve(path);
    t.is(path, resolved);
  });
});

test('Evaluates absolute paths', t => {
  const bundle = t.context.bundle;
  const paths = {
    '/usr/local/test.srt': '/usr/local/test.srt',
    '/usr/local': '/usr/local',
  };

  t.plan(keys(paths).length);

  map(paths, (resolved, path) => {
    path = bundle.resolve(path);
    t.is(path, resolved);
  });
});

test('getKey() - Verifies key extraction', t => {
  const samples = [
    'testS01E02.ext',
    'testS1E2.ext',
    'testS01.E02.ext',
    'testS01_E02.ext',
    'testS01xE02.ext',
    'test1x02.ext',
    'test102.ext',
  ];

  let key;

  t.plan(samples.length);

  map(samples, sample => {
    key = getKey(sample);
    t.is(key, 'S01E02');
  });
});

test('Can properly [multiple] bundle the whole nine yards', t => {
  const baseDir = 'test/resources';
  const path = resolve(`${baseDir}/tmp-bundle`);
  const prefix = 'The.Bundle';
  const files = {
    'testS01E01.mp4': '',
    'testS1E2.mp4': '',
    'testS01.E03.mp4': '',
    'testS01_E04.mp4': '',
    'testS01xE05.mp4': '',
    'test1x06.mp4': '',
    'test107.mp4': '',
  };

  const config = {
    'test/resources/tmp-bundle' : files,
  };

  /**
   * Filesystem logic
   */
  mockFs(config);

  const bundle = new Bundle(path, prefix);

  /**
   * Assertions
   */
  try {
    bundle.run(() => {
      const directory = resolve(`${baseDir}/${prefix}`);

      // Verify directory rename
      if(statSync(directory).isDirectory()) {
        const tree = readdirSync(directory);
        const pattern = (`^${prefix}.S[0-9]+E[0-9]+.mp4$`).replace(/[.]/g, '\\.');
        const regex = new RegExp(pattern);

        // Verify files rename
        t.plan(keys(files).length);

        map(tree, file => {
          t.true(regex.test(file), `Match Error [${pattern}] => ${file}`);
        });

        mockFs.restore();
      } else {
        mockFs.restore();
        t.fail("There's an issue with the final directory output");
      }
    });
  } catch (e) {
    mockFs.restore();
    t.fail();
    console.error(e);
  }
});

test('Can properly [single] bundle the whole nine yards', t => {
  const baseDir = 'test/resources';
  const path = resolve(`${baseDir}/tmp-bundle`);
  const prefix = 'The.Bundle';
  const subtitle = readFileSync(resolve('test/resources/sample.ssa'));
  const files = {
    'test.mp4': '',
    'media.jpg': '',
    'test.srt': subtitle,
  };
 
  const config = {
    'test/resources/tmp-bundle' : files,
  };
 
  /**
   * Filesystem logic
   */
  mockFs(config);
 
  const bundle = new Bundle(path, prefix);
 
  /**
   * Assertions
   */
  try {
    bundle.run(() => {
      const directory = resolve(`${baseDir}/${prefix}`);
 
      // Verify directory rename
      if(statSync(directory).isDirectory()) {
        const tree = readdirSync(directory);
        const pattern = (`^(${prefix}|cover)(.[a-z]+)?.[a-z0-4]+$`)
                          .replace(/[.]/g, '\\.');
        const regex = new RegExp(pattern);
 
        // Verify files rename
        t.plan(keys(files).length);
 
        map(tree, file => {
          t.true(regex.test(file), `Match Error[${pattern}] => ${file}`);
        });
 
        mockFs.restore();
      } else {
        mockFs.restore();
        t.fail("There's an issue with the final directory output");
      }
    });
  } catch (e) {
    mockFs.restore();
    t.fail();
    console.error(e);
  }
});
