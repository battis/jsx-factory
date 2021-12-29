import JSXFactory from './JSXFactory';
import Fixture from './JSXFactory.fixture';

describe('JSXFactory', () => {
    for (const argType of Object.getOwnPropertyNames(Fixture.elements)) {
        test(`createElement(${argType})`, () => {
            const e = JSXFactory.createElement(Fixture.elements[argType]);
            Fixture.verifyElement(e);
            expect(e.hasAttributes()).toBeFalsy();
            expect(e.hasChildNodes()).toBeFalsy();
        });
        test(`createElement(${argType}, props)`, () => {
            const e = JSXFactory.createElement(
                Fixture.elements[argType],
                Fixture.properties
            );
            Fixture.verifyElement(e);
            Fixture.verifyProperties(e);
            expect(e.hasChildNodes()).toBeFalsy();
        });
        test(`createElement(${argType}, props, children)`, () => {
            const e = JSXFactory.createElement(
                Fixture.elements[argType],
                Fixture.properties,
                Fixture.children
            );
            Fixture.verifyElement(e);
            Fixture.verifyProperties(e);
            Fixture.verifyChildren(e);
        });
    }
    test('elementFromSource(string)', () => {
        let f = JSXFactory.elementFromSource('<div/>');
        let e = JSXFactory.createElement(f);
        Fixture.verifyElement(e);
        expect(e.hasAttributes()).toBeFalsy();
        expect(e.hasChildNodes()).toBeFalsy();

        f = JSXFactory.elementFromSource('<div foo="bar" baz="2"/>');
        e = JSXFactory.createElement(f);
        Fixture.verifyElement(e);
        Fixture.verifyProperties(e);
        expect(e.hasChildNodes()).toBeFalsy();

        f = JSXFactory.elementFromSource(
            '<div foo="bar" baz="2"><div></div><span></span><p></p></div>'
        );
        e = JSXFactory.createElement(f);
        Fixture.verifyElement(e);
        Fixture.verifyProperties(e);
        Fixture.verifyChildren(e);
    });
});
