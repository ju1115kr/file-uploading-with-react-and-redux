import { combineReducers } from 'redux';
import files from './filesReducer';
import notification from './notificationReducer';
import fileUploadingProgresses from './fileUploadingProgressesReducer';

const rootReducer = combineReducers({
  files,
  notification,
  fileUploadingProgresses,
});

export default rootReducer;

