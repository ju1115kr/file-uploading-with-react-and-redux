import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as fileUploadingActions from '../actions/fileUploadingActions';
import * as notificationActions from '../actions/notificationActions';
import * as notificationTypes from '../constants/notificationTypes';


class FileUploader extends React.Component {

  constructor(props) {
    super(props);

    this.openFileBrowser = this.openFileBrowser.bind(this);
    this.processDrop = this.processDrop.bind(this);
  }

  openFileBrowser() {
    this.dropzone.open();
  }

  processDrop(acceptedFiles, rejectedFiles) {
    acceptedFiles.forEach((file) => {
      this.props.fileUploadingActions.upload(file);
    });

    if (rejectedFiles.length) {
      this.processRejectedFiles(rejectedFiles);
    }
  }

  processRejectedFiles(rejectedFiles) {
    let message = 'Could not upload files: ';

    rejectedFiles.forEach((file) => {
      message += `"${file.name}" `;
    });

    this.props.notificationActions.notify(notificationTypes.ERROR, message);
  }

  render() {
    let tipText = 'Drag & Drop files here';
    if (!this.props.multiple) {
      tipText = 'Drag & Drop a file here';
    }

    return (
      <Dropzone
        ref={(node) => { this.dropzone = node; }}
        onDrop={this.processDrop}
        multiple={this.props.multiple}
        className="file-drop-zone"
        activeClassName="file-drop-zone file-drop-zone--active"
        accept={this.props.accept}
        maxSize={this.props.maxSize}
        disableClick
      >
        <div className="file-drop-zone__tip">
          <i className="file-drop-zone__tip-icon fa fa-upload" />

          <p>{tipText}</p>
          <p>- or -</p>

          <button className="button" onClick={this.openFileBrowser} type="button">
            Open the File Browser
          </button>
        </div>
      </Dropzone>
    );
  }
}

FileUploader.propTypes = {
  accept: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  maxSize: PropTypes.number,
  fileUploadingActions: PropTypes.shape({
    upload: PropTypes.func.isRequired,
  }).isRequired,
  notificationActions: PropTypes.shape({
    notify: PropTypes.func.isRequired,
  }).isRequired,
};

FileUploader.defaultProps = {
  multiple: true,
  maxSize: Infinity
};

function mapDispatchToProps(dispatch) {
  return {
    fileUploadingActions: bindActionCreators(fileUploadingActions, dispatch),
    notificationActions: bindActionCreators(notificationActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(FileUploader);
