import Fixture from './_Array.fixture';
import _Array from './_Array';

describe('_Array', () => {
    test('flatten()', () => {
        expect(_Array.flatten(Fixture.nested)).toStrictEqual(Fixture.flat);
        expect(_Array.flatten(Fixture.flat)).toStrictEqual(Fixture.flat);
        expect(Fixture.nested).not.toBe(Fixture.flat);
    });
});
