import React, { PropTypes } from 'react';

const Image = ({ imageId, src, onRemove }) => (
  <div className="column">
    <div className="uploaded-image">
      <button
        className="uploaded-image__remove-button"
        onClick={(event) => {
          onRemove(event, imageId);
        }}
      >
        <i className="fa fa-times" />
      </button>

      <img src={src} alt="" />
    </div>
  </div>
);

Image.propTypes = {
  imageId: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Image;

