import React, { Component } from 'react';
import Event from 'components/event';
import schedule from 'data/schedule';

// No point adding an alias for this yet - we'll move it somewhere more reasonalbale at some point
import initIcons from '../../icons';
// import sendCalendarRequest from '../../modules/events/api';

import './App.scss';

class App extends Component {
  constructor() {
    super();
    initIcons();
  }

  state = {
    // user: 'rody.kirwan@gmail.com',
    selectedEvents: []
  }

  selectEvent = (event) => {
    const { /* user, */ selectedEvents } = this.state;

    // sendCalendarRequest({
    //   user,
    //   event
    // }).then(() => this.setState({
    //   selectedEvents: [...selectedEvents, event]
    // }));
    this.setState({
      selectedEvents: [...selectedEvents, event]
    });
  }

  render() {
    const { selectedEvents } = this.state;

    return (
      <div className="app-container">
        { schedule.map(event => (
          <Event
            selected={selectedEvents.includes(event.title)}
            selectEvent={this.selectEvent}
            event={event}
            key={event.title.split(' ').join('_')}
          />
        ))
        }
      </div>
    );
  }
}

export default App;
