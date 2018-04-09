import anyTest, {TestInterface} from 'ava';
import { map, merge } from 'lodash';
import { Bundle } from '../cli/bundle';
// import { G } from '@types/node/glob'

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

  t.plan(4);

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

  t.plan(2);

  map(paths, (resolved, path) => {
    path = bundle.resolve(path);
    t.is(path, resolved);
  });
});
