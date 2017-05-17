import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Line } from 'rc-progress';

const ProgressBar = ({ percent, remaining }) => {
  const progressBarClassName = classNames({
    'progress-bar': true,
    invisible: remaining === 0,
  });

  return (
    <div className={progressBarClassName}>
      <div className="row">
        <div className="small-12 medium-10 large-10 columns">
          <Line
            percent={percent}
            strokeWidth={3}
            trailWidth={3}
            strokeLinecap="square"
            strokeColor="#2db7f5"
            className="progress-bar__line"
          />
        </div>
        <div className="small-12 medium-2 large-2 columns text-center">
          <p className="progress-bar__remaining-count">Remaining: {remaining}</p>
        </div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
};

export default ProgressBar;

