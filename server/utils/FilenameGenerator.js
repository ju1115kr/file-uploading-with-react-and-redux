const crypto = require('crypto');

class FilenameGenerator {

  static generate(cb) {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      if (err) { return cb(err); }

      cb(null, raw.toString('hex'));
    });
  }

}

module.exports = FilenameGenerator;
