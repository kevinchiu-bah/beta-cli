import test from 'ava';
import { mkdirSync, rmdirSync } from 'fs';
import { head, map } from 'lodash';
import { resolve } from 'path';
import { cwd } from 'process';
import { exec, env } from 'shelljs';
import { detectLocale, echo } from '../src/helpers';

const testDir = resolve(cwd(), './test/resources');
env['TEST'] = testDir;

test.before(t => {
  mkdirSync(`${testDir}/test`);
});

test('echo() - Evaluates absolute paths', t => {
  const paths = [
    '$TEST/test',
    '$TEST/*',
  ];

  t.plan(2);

  map(paths, path => {
    path = echo(path);
    t.is(path, `${env['TEST']}/test`);
  });
});

test('echo() - Evaluates relative paths', t => {
  const paths = [
    './test/resources/test',
    './test/resources/*',
  ];

  t.plan(2);

  map(paths, path => {
    path = echo(path);
    t.is(path, `${env['TEST']}/test`);
  });
});

test('detectLocale() - Verify string detection to return language locale code is working', t => {
  const samples = {
    'en': 'This is the first language to test',
    'th': 'พวกเราเราอยู่ท่ามกลางเหล่าคนตาย',
  };

  t.plan(2);

  map(samples, (sample, locale) => {
    t.is(locale, detectLocale(sample));
  });
});

test.after.always('cleaning up..', t => {
  rmdirSync(`${testDir}/test`);
});
