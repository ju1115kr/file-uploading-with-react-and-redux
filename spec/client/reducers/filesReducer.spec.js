import { expect } from 'chai';
import Immutable from 'immutable';
import filesReducer from '../../../client/src/reducers/filesReducer';
import * as fileUploadingActions from '../../../client/src/actions/fileUploadingActions';
import * as fileManagementActions from '../../../client/src/actions/fileManagementActions';


describe('Files Reducer', () => {
  it('adds information about a file to the store', () => {
    const initialState = Immutable.List();
    const id = 1000;
    const uploaded = false;
    const url = '/hello.jpg';
    const meta = Immutable.Map({
      id,
      uploaded,
      url,
    });
    const action = fileUploadingActions.initUploading(meta);

    const newState = filesReducer(initialState, action);
    const file = newState.get(0);

    expect(newState.size).to.equal(1);
    expect(file.get('id')).to.equal(id);
    expect(file.get('url')).to.equal(url);
    expect(file.get('uploaded')).to.equal(uploaded);
  });

  it('updates information about a file after it was successfully uploaded', () => {
    const id = 100;
    const imageUrl = '/hello.jpg';
    const index = 1;
    const initialState = Immutable.fromJS([
      { id: 1, uploaded: true, url: '/planet-earth.png' },
      { id: 100, uploaded: false, url: '' },
    ]);
    const action = fileUploadingActions.completeUploading(id, imageUrl);

    const newState = filesReducer(initialState, action);

    const fileMeta = newState.get(index);
    expect(fileMeta.get('id')).to.equal(id);
    expect(fileMeta.get('url')).to.equal(imageUrl);
    expect(fileMeta.get('uploaded')).to.equal(true);
  });

  it('removes information about a file from the store', () => {
    const fileThatShouldBeDeleted = {
      id: 100,
      uploaded: true,
      url: '/hello.jpg',
    };
    const fileThatShouldStay = {
      id: 1,
      uploaded: true,
      url: '/planet-earth.png',
    };
    const initialState = Immutable.fromJS([fileThatShouldBeDeleted, fileThatShouldStay]);
    const action = fileManagementActions.remove(fileThatShouldBeDeleted.id);

    const newState = filesReducer(initialState, action);
    const remainingFile = newState.get(0);

    expect(newState.size).to.equal(1);
    expect(remainingFile.get('id')).to.equal(fileThatShouldStay.id);
  });
});

