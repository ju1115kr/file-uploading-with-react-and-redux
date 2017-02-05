import * as actionTypes from '../constants/actionTypes';

export function notify(notificationType, message) {
  return {
    type: actionTypes.NOTIFY,
    notificationType,
    message,
  };
}
