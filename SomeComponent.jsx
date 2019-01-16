import React from 'react';
import addBar from './index';

class SomeComponent extends React.Component {
  render() {
    return React.createElement('div', null, addBar(this.props.value));
  }
}

export default SomeComponent;
