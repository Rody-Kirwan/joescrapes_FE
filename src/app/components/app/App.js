import React, { Component } from 'react';
import Event from '../event';
import initFonts from '../../font';
import schedule from '../../../data/schedule';
import sendCalendarRequest from '../../modules/events/api';

import './App.scss';

class App extends Component {
  constructor() {
    super();
    initFonts();
  }

  state = {
    user: 'rody.kirwan@gmail.com',
    selectedArtists: []
  }

  selectArtist = (artist) => {
    const { user, selectedArtists } = this.state;

    sendCalendarRequest({
      user,
      artist
    }).then(() => this.setState({
      selectedArtists: [selectedArtists, artist]
    }));
  }

  render() {
    const { selectedArtists } = this.state;

    return (
      <div className="app-container">
        { schedule.map(show => (
          <Event
            selected={selectedArtists.includes(show.title)}
            selectArtist={this.selectArtist}
            show={show}
            key={show.title.split(' ').join('_')}
          />
        ))
        }
      </div>
    );
  }
}

export default App;
