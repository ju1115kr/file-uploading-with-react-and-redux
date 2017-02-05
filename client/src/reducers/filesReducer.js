import Immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = Immutable.List();

/**
 * A reducer for file manipulation
 *
 * @param {Immutable.List} state
 * @param {Object} action
 * @returns {Immutable.List} current state or updated state
 */
export default function filesReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INIT_FILE_UPLOADING:
      return state.push(action.meta);

    case actionTypes.UPLOAD_FILE_SUCCESS: {
      const { id, url } = action;
      const index = state.findIndex(one => one.get('id') === id);
      const file = state.get(index);
      const updatedFile = file.merge({
        uploaded: true,
        url,
      });

      return state.update(index, () => updatedFile);
    }

    case actionTypes.REMOVE_FILE: {
      const { id } = action;
      const index = state.findIndex(one => one.get('id') === id);

      return state.delete(index);
    }

    default:
      return state;
  }
}
