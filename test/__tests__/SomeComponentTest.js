import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallow } from 'enzyme';
import SomeComponent from '../../SomeComponent';
import * as bar from 'anotherRoot/bar';

Enzyme.configure({ adapter: new Adapter() });

describe('SomeComponent', () => {
  it('should test component', () => {
    spyOn(bar, 'default').and.returnValue(7);
    const wrapper = shallow(React.createElement(SomeComponent, { value: 1 }));
    expect(wrapper.text()).toBe('8');
  });
});
