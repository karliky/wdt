import fs from 'fs';

/**
 * Let the user know that he must call loadWDT before operating with the WDT
 */
const handlerError = 'Missing file handler, please call loadWDT';

const hexAppendix = '0x';

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
    if (!this.fileHandler) return cb(new Error(handlerError));
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

  getMPHD(cb) {
    if (!this.fileHandler) return cb(new Error(handlerError));

    // Allocate 40 bytes
    let MPHDData = new Buffer(0x28);

    const setMPHDData = (err) => {
      if (err) return cb(err);
      const MPHDdefinition = {
        header: MPHDData.toString("utf-8", 0x0, 0x4),
        flags: hexAppendix + MPHDData.readInt32LE(0x4).toString(16),
        unused: hexAppendix + MPHDData.readInt32LE(0x8).toString(16)
        // There are more 28 bytes more unused
        // No need to read them
      };
      this.MPHD = MPHDdefinition;
      MPHDData = null;
      cb(null, MPHDdefinition);
    }

    fs.read(this.fileHandler, MPHDData, 0x0, 0x28, 0xC, setMPHDData);
  }

  getInstanceName() {
    console.log(`Instance name: ${this.name}`)
  }
}

export default wdtModel;
