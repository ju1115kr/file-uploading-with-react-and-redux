import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ProgressBar from '../components/ProgressBar';


class FileUploadingMonitor extends React.Component {

  constructor(props) {
    super(props);

    this.progresses = Immutable.List();

    this.state = {
      percent: 0,
      remaining: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.progresses = nextProps.fileUploadingProgresses;

    this.setState({
      remaining: this.progresses.size,
      percent: this.getMinPercent(),
    });
  }

  getMinPercent() {
    let min = 0;

    const mapWithMinPercent = this.progresses.minBy(progress => progress.get('percent'));
    if (mapWithMinPercent) {
      min = mapWithMinPercent.get('percent');
    }

    return min;
  }

  render() {
    const { percent, remaining } = this.state;

    return (
      <ProgressBar percent={percent} remaining={remaining} />
    );
  }

}

FileUploadingMonitor.propTypes = {
  fileUploadingProgresses: ImmutablePropTypes.list.isRequired,
};

function mapStateToProps(state) {
  return {
    fileUploadingProgresses: state.fileUploadingProgresses,
  };
}

export default connect(mapStateToProps)(FileUploadingMonitor);

