import React from 'react';
import FileUploader from '../containers/FileUploader';
import ImageManager from '../containers/ImageManager';
import FileUploadingMonitor from '../containers/FileUploadingMonitor';
import Toastr from '../containers/Toastr';


const Root = () => (
  <div>

    <div className="row">
      <div className="small-12 columns">
        <FileUploader
          accept="image/jpeg,image/png"
          multiple
          maxSize={1024 * 1024 * 10}
        />
        <ImageManager />
      </div>
    </div>

    <FileUploadingMonitor />

    <Toastr />
  </div>
);

export default Root;
