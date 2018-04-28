import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  handleClick = (e) => {
    alert(e);
  }

  render() {
    const { title } = this.props;
    return (
      <div>
        <h1>{title}</h1>
        <button
          onClick={((e) => {
            this.handleClick(e);
          })}
        >
          Test Click
        </button>
      </div>
    );
  }
}

export default App;
