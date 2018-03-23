import { foo } from '../../index';

test('foo should be awesome', () => {
	expect(foo(1, 2)).toBe(3);
});

