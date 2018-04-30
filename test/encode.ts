import test from 'ava';
import { copyFileSync, existsSync, statSync, unlinkSync } from 'fs';
import mockFs from 'mock-fs';
import { resolve } from 'path';
import { Encode } from '../src/encode';

test.cb.skip('Can auto encode to UTF-8 and sanitize', t => {
  const src = resolve('./test/resources/sample.ssa');
  const target = resolve('./test/resources/sample.ssa.backup');

  const locale = Encode(src, { backup: true });
  const exists = existsSync(target);

  // Verify backup was made
  t.true(exists);

  // Verify new file isn't empty
  if(exists) {
    const stats = statSync(src);
    t.true(stats.size > 0);
  }

  // Verify locale detection was good
  t.is(locale, 'th');

  // Clean up
  copyFileSync(target, src);
  unlinkSync(target);

  t.end();
});


test('Verify backup option works', t => {
  const baseDir = 'test/resources/tmp-bundle';
  const file = 'test.srt';
  const target = resolve(`${baseDir}/${file}`);
  const backup = resolve(`${baseDir}/${file}.backup`);
  const config = {};

  config[baseDir] = {
    'test.srt': 'พวกเราเราอยู่ท่ามกลางเหล่าคนตาย',
    'test.srt.backup': '',
  };

  t.plan(4);

  // Assertions for when backup => false
  mockFs(config);
  Encode(target, { backup: false });

  t.true(existsSync(target));
  t.falsy(statSync(backup).size);

  Encode(target, { backup: true });

  t.true(existsSync(target));
  t.truthy(statSync(backup).size);

  mockFs.restore();
});
