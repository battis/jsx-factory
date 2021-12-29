import Fixture from './_Object.fixture';
import _Object from './_Object';

describe('_Object', () => {
    test('excludeProperties()', () => {
        Fixture.verifyExclude(
            _Object.excludeProperties(Fixture.source, Fixture.keySubset)
        );
    });
    test('includeProperties()', () => {
        Fixture.verifyInclude(
            _Object.includeProperties(Fixture.source, Fixture.keySubset)
        );
    });
    test('transformPropertyNames()', () => {
        Fixture.verifyTransformation(
            _Object.transformPropertyNames(Fixture.source, Fixture.transformation)
        );
    });
});
