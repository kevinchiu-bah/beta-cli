import anyTest, { TestInterface } from 'ava';
import { keys, map, merge } from 'lodash';
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

test.todo('Can properly bundle and encode multiple subtitles');
