import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Event.scss';

class Event extends Component {
  static propTypes = {
    show: PropTypes.objectOf(PropTypes.string).isRequired,
    selectArtist: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired
  }

  selectArtist = title => this.props.selectArtist(title)

  render() {
    const { show, selected } = this.props;
    const isSelected = selected ? 'selected' : '';
    return (
      <div
        role="button"
        tabIndex="0"
        onKeyDown={(() => this.selectArtist(show.title))}
        onClick={(() => this.selectArtist(show.title))}
        className={`event ${isSelected}`}
      >
        { show.title }
      </div>
    );
  }
}

export default Event;

