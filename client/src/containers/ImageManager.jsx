import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Image from '../components/Image';
import * as fileManagementActions from '../actions/fileManagementActions';


class ImageManager extends React.Component {

  constructor(props) {
    super(props);

    this.remove = this.remove.bind(this);
  }

  remove(event, id) {
    event.preventDefault();

    this.props.fileManagementActions.remove(id);
  }

  render() {
    const { files } = this.props;
    const uploadedImages = files.filter(one => one.get('uploaded') === true);

    return (
      <div className="row small-up-2 medium-up-3 large-up-4">
        {uploadedImages.toArray().map(image => (
          <Image
            key={image.get('id')}
            imageId={image.get('id')}
            src={image.get('url')}
            onRemove={this.remove}
          />
        ))}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    files: state.files,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fileManagementActions: bindActionCreators(fileManagementActions, dispatch),
  };
}

ImageManager.propTypes = {
  files: ImmutablePropTypes.list.isRequired,
  fileManagementActions: PropTypes.shape({
    remove: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageManager);

