import fs from 'fs';

class wdtModel {
  constructor() {
    this.name = '';
    this.path = '';
    this.fileHandler = '';
  }

  loadWDT(filePath, cb) {
    this.path = filePath;
    const setHandler = (err, handle) => {
      this.fileHandler = handle;
      cb(err, handle);
    };
    fs.open(filePath, 'r', cb);
  }

  getInstanceName() {
    console.log(`Instance name: ${this.name}`)
  }
}

export default wdtModel;
