import Immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const progresses = Immutable.List();

/**
 * A reducer for progress status (of currently uploading files) manipulation
 *
 * @param {Immutable.List} state
 * @param {Object} action
 * @returns {Immutable.List} current state or updated state
 */
export default function fileUploadingProgressesReducer(state = progresses, action) {
  switch (action.type) {
    case actionTypes.INIT_FILE_UPLOADING: {
      const progress = Immutable.Map({
        id: action.meta.get('id'),
        percent: 0,
      });

      return state.push(progress);
    }

    case actionTypes.UPDATE_FILE_UPLOADING_PROGRESS: {
      const index = state.findIndex(one => one.get('id') === action.id);
      const progress = state.get(index);
      const updatedProgress = progress.set('percent', action.percent);

      return state.update(index, () => updatedProgress);
    }

    case actionTypes.UPLOAD_FILE_SUCCESS:
    case actionTypes.UPLOAD_FILE_ERROR: {
      const index = state.findIndex(one => one.get('id') === action.id);

      return state.delete(index);
    }

    default:
      return state;
  }
}
