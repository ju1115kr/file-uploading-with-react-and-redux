import Immutable from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = Immutable.Map({
  message: '',
  type: '',
});

/**
 * A reducer for notification manipulation
 *
 * @param {Immutable.Map} state
 * @param {Object} action
 * @returns {Immutable.Map} current state or updated state
 */
export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.NOTIFY: {
      const { notificationType, message } = action;

      return state.merge({
        type: notificationType,
        message,
      });
    }

    default:
      return state;
  }
}
