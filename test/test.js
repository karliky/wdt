import WDT from '../distribution/index.js';
import assert from 'assert';
import path from 'path';

/**
 * The library instance that we'll use among all the tests
 */
const wdt = new WDT();

describe('WDT Parser', function() {
  describe('file system operations', function () {

    const filePath = path.join(__dirname, '../files/Rodmilak.wdt');

    it('should return a file handler', function (done) {
      wdt.loadWDT(filePath, done);
    });
  });
});
