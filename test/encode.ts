import test from 'ava';
import { existsSync, statSync, unlinkSync } from 'fs';
import { resolve } from 'path';
import { Encode } from '../src/encode';

test.cb('Can auto encode to UTF-8 and sanitize', t => {
  const src = resolve('./test/resources/sample.ssa');
  const target = resolve('./test/resources/sample.th.ssa');

  Encode(src, 'th', 'UTF-8', false, () => {
    const exists = existsSync(target);
    t.true(exists);

    if(exists) {
      const stats = statSync(target);
      t.true(stats.size > 0);
    }

    // Clean up
    unlinkSync(target);

    t.end();
  });
});
