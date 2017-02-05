import * as actionTypes from '../constants/actionTypes';

export function remove(id) {
  return {
    type: actionTypes.REMOVE_FILE,
    id,
  };
}
