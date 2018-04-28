import test from 'ava';
import { copyFileSync, existsSync, statSync, unlinkSync } from 'fs';
import { resolve } from 'path';
import { Encode } from '../src/encode';

test.cb('Can auto encode to UTF-8 and sanitize', t => {
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
