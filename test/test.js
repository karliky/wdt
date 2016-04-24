import WDT from '../distribution/index.js';
import assert from 'assert';

/**
 * The library instance that we'll use among all the tests
 */
const wdt = new WDT();

describe('WDT Parser', function() {
  describe('file system operations', function () {
    it('should return a file handler', function (done) {
      console.log(wdt.loadWDT('../files/Rodmilak.wdt', done));
    });
  });
});
