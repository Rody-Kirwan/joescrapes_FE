import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.scss';

class App extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  handleClick = (msg) => {
    alert(msg);
  }

  render() {
    const { title } = this.props;

    return (
      <div className="app-container">
        <h1>{title}</h1>
        <button
          onClick={(() => {
            this.handleClick('I\'ve done clicked the button');
          })}
        >
          Test Click
        </button>
      </div>
    );
  }
}

export default App;
