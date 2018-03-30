/*import React from 'react';
import addBar from './index';*/

const React = require('react');
const addBar = require('./index').default;

class SomeComponent extends React.Component {
    render() {
        return React.createElement('div', null, addBar(this.props.value));
    }
}

module.exports.default = SomeComponent;
// export default SomeComponent;