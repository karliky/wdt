import fs from 'fs';

/**
 * Let the user know that he must call loadWDT before operating with the WDT
 */
const REVMHandlerError = 'Missing file handler, please call loadWDT';

/**
 * This is where the magic happens
 */
class wdtModel {
  constructor() {
    this.name = null;
    this.path = null;
    this.REVM = null;
    this.fileHandler = null;
  }

  loadWDT(filePath, cb) {
    this.path = filePath;
    const setHandler = (err, handle) => {
      this.fileHandler = handle;
      cb(err, handle);
    };
    fs.open(filePath, 'r', setHandler);
  }

  getREVM(cb) {
    if (!this.fileHandler) return cb(new Error(REVMHandlerError));
    // Allocate 12 bytes
    let REVMData = new Buffer(12);

    const setREVMData = (err) => {
      if (err) return cb(err);
      const REVMdefinition = {
        header: REVMData.toString("utf-8", 0, 4),
        version: REVMData.readInt32LE(4),
        revision: REVMData.readInt32LE(8)
      };
      this.REVM = REVMdefinition;
      // Free memory, we don't need the buffer anymore
      REVMData = null;
      cb(null, REVMdefinition);
    }

    fs.read(this.fileHandler, REVMData, 0x0, 0xC, 0x0, setREVMData);
  }

  getInstanceName() {
    console.log(`Instance name: ${this.name}`)
  }
}

export default wdtModel;
