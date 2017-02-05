import request from 'superagent';
import Immutable from 'immutable';
import * as notificationActions from './notificationActions';
import * as actionTypes from '../constants/actionTypes';
import * as notificationTypes from '../constants/notificationTypes';


let lastId = 0;

export function initUploading(meta) {
  return {
    type: actionTypes.INIT_FILE_UPLOADING,
    meta,
  };
}

export function completeUploading(id, url) {
  return {
    type: actionTypes.UPLOAD_FILE_SUCCESS,
    id,
    url,
  };
}

export function abortUploading(id) {
  return {
    type: actionTypes.UPLOAD_FILE_ERROR,
    id,
  };
}

export function updateUploadingProgress(id, percent) {
  return {
    type: actionTypes.UPDATE_FILE_UPLOADING_PROGRESS,
    id,
    percent,
  };
}

export function upload(file) {
  return function (dispatch) {
    lastId += 1;

    const id = lastId;
    const filename = file.name;
    const meta = Immutable.Map({
      id,
      uploaded: false,
      url: '',
    });

    dispatch(initUploading(meta));

    request
      .post('/upload')
      .attach('file', file)
      .set('Accept', 'application/json')
      .on('progress', (event) => {
        const percent = event.percent;

        dispatch(updateUploadingProgress(id, percent));
      })
      .end((err, res) => {
        let message;
        let notificationType;

        if (err) {
          message = `Could not upload the file: ${filename}. ${res.error.message}`;
          notificationType = notificationTypes.ERROR;
        } else {
          dispatch(completeUploading(id, res.body.url));

          message = `The file ${filename} has been successfully uploaded.`;
          notificationType = notificationTypes.SUCCESS;
        }

        dispatch(notificationActions.notify(notificationType, message));
      });
  };
}
