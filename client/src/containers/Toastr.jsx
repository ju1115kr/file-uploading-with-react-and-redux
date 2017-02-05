import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { ToastContainer, ToastMessage } from 'react-toastr';
import * as notificationTypes from '../constants/notificationTypes';
import '../../../node_modules/animate.css/animate.css';
import '../../../node_modules/toastr/build/toastr.css';


const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class Toastr extends React.Component {

  componentWillReceiveProps(nextProps) {
    const { notification } = nextProps;
    const type = notification.get('type');
    const message = notification.get('message');

    if (type === notificationTypes.ERROR) {
      this.toastrContainer.error(message);
    } else if (type === notificationTypes.SUCCESS) {
      this.toastrContainer.success(message);
    }
  }

  render() {
    return (
      <ToastContainer
        toastMessageFactory={ToastMessageFactory}
        ref={(c) => { this.toastrContainer = c; }}
        className="toast-top-right"
      />
    );
  }

}

function mapStateToProps(state) {
  return {
    notification: state.notification,
  };
}

Toastr.propTypes = {
  notification: ImmutablePropTypes.mapContains({
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Toastr);

