import { expect } from 'chai';
import Immutable from 'immutable';
import notificationReducer from '../../../client/src/reducers/notificationReducer';
import * as notificationActions from '../../../client/src/actions/notificationActions';
import * as notificationTypes from '../../../client/src/constants/notificationTypes';


describe('Notification Reducer', () => {
  it('sets a notification of a given type', () => {
    const initialState = Immutable.Map({
      message: '',
      type: '',
    });
    const type = notificationTypes.SUCCESS;
    const message = 'Successfully uploaded';
    const action = notificationActions.notify(type, message);

    const newState = notificationReducer(initialState, action);

    expect(newState.get('type')).to.equal(type);
    expect(newState.get('message')).to.equal(message);
  });
});

