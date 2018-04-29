import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Event.scss';

class Event extends Component {
  static propTypes = {
    event: PropTypes.objectOf(PropTypes.string).isRequired,
    selectEvent: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired
  }

  selectEvent = title => this.props.selectEvent(title)

  render() {
    const { event, selected } = this.props;
    const isSelected = selected ? 'selected' : '';
    return (
      <div
        role="button"
        tabIndex="0"
        onKeyDown={(() => this.selectEvent(event.title))}
        onClick={(() => this.selectEvent(event.title))}
        className={`event ${isSelected}`}
      >
        { event.title }
      </div>
    );
  }
}

export default Event;

