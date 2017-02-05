const express = require('express');
const busboy = require('connect-busboy');
const path = require('path');
const fs = require('fs');
const FilenameGenerator = require('./server/utils/FilenameGenerator');

const app = express();
const uploadDir = path.join(__dirname, 'server/static/uploads');

app.use(busboy());
app.use(express.static(path.join(__dirname, 'server/static')));
app.use(express.static(path.join(__dirname, 'client/dist')));

app.post('/upload', (req, res, next) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png'];
  const correspondingFileExtensions = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
  };


  req.busboy.on('file', (fieldname, file, filename, encoding, mimeType) => {
    if (allowedMimeTypes.indexOf(mimeType) === -1) {
      const restrictedFileTypeError = new Error('Restricted File Type');
      restrictedFileTypeError.status = 422; // Unprocessable Entity status code

      return next(restrictedFileTypeError);
    }

    FilenameGenerator.generate((err, generatedFilename) => {
      if (err) {
        return next(new Error('Could not upload the file.'));
      }

      const destinationFilename = `${generatedFilename}.${correspondingFileExtensions[mimeType]}`;
      const writeStream = fs.createWriteStream(path.join(uploadDir, destinationFilename));

      file.pipe(writeStream);

      file.on('end', () => {
        res.send({
          url: `/uploads/${destinationFilename}`,
        });
      });
    });
  });

  req.pipe(req.busboy);
});

// error handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;

  return res.status(statusCode).json({
    message: err.message,
  });
});

module.exports = app;

