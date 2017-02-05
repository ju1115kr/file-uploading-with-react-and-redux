import { expect } from 'chai';
import Immutable from 'immutable';
import fileUploadingProgressesReducer from '../../../client/src/reducers/fileUploadingProgressesReducer';
import * as fileUploadingActions from '../../../client/src/actions/fileUploadingActions';


describe('FileUploadingProgresses Reducer', () => {
  it('adds a progress status with 0 percent complete after upload initialization', () => {
    const initialState = Immutable.List();
    const id = 100;
    const meta = Immutable.Map({
      id,
    });
    const action = fileUploadingActions.initUploading(meta);

    const newState = fileUploadingProgressesReducer(initialState, action);
    const progress = newState.get(0);

    expect(newState.size).to.equal(1);
    expect(progress.get('id')).to.equal(id);
    expect(progress.get('percent')).to.equal(0);
  });

  it('removes a progress status when uploading aborted with an error', () => {
    const initialState = Immutable.List();
    const id = 100;
    const meta = Immutable.Map({
      id,
    });
    const action1 = fileUploadingActions.initUploading(meta);
    const updatedState = fileUploadingProgressesReducer(initialState, action1);
    const action2 = fileUploadingActions.abortUploading(id);
    const finalState = fileUploadingProgressesReducer(updatedState, action2);

    expect(finalState.size).to.equal(0);
  });

  it('removes a progress status when uploading was successfully finished', () => {
    const initialState = Immutable.List();
    const id = 100;
    const meta = Immutable.Map({
      id,
    });
    const action1 = fileUploadingActions.initUploading(meta);
    const updatedState = fileUploadingProgressesReducer(initialState, action1);
    const action2 = fileUploadingActions.completeUploading(id);
    const finalState = fileUploadingProgressesReducer(updatedState, action2);

    expect(finalState.size).to.equal(0);
  });

  it('updates a progress status', () => {
    const initialState = Immutable.List();
    const id = 100;
    const percent = 75;
    const meta = Immutable.Map({
      id,
    });
    const action1 = fileUploadingActions.initUploading(meta);
    const updatedState = fileUploadingProgressesReducer(initialState, action1);
    const action2 = fileUploadingActions.updateUploadingProgress(id, percent);
    const finalState = fileUploadingProgressesReducer(updatedState, action2);

    const progress = finalState.get(0);

    expect(progress.get('id')).to.equal(id);
    expect(progress.get('percent')).to.equal(percent);
  });
});
