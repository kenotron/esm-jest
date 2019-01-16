import { addBar } from '../../index';
import * as bar from 'anotherRoot/bar';

test('addBar should be add five', () => {
  expect(addBar(2)).toBe(7);
});

test('addBar should be add another number', () => {
  spyOn(bar, 'default').and.returnValue(6);
  expect(addBar(2)).toBe(8);
});
