import JSXFactory, { JSXComponent } from './JSXFactory';

export default class Fixture {
    static elements = {
        string: 'div',
        JSXFunction: (props, children) => <div {...props}>{children}</div>,
        JSXComponent: class implements JSXComponent {
            props;

            constructor(props) {
                this.props = props;
            }

            render(children?) {
                return <div {...this.props}>{children}</div>;
            }
        }
    };
    static verifyElement = (e) => {
        expect(e).toBeInstanceOf(HTMLDivElement);
        expect(e.isConnected).toBeFalsy();
    };
    static properties = { foo: 'bar', baz: 2 };
    static verifyProperties = (e) => {
        expect(e.getAttribute('foo')).toBe('bar');
        expect(e.getAttribute('baz')).toBe('2');
        expect(e.getAttributeNames().length).toBe(2);
    };

    static get children() {
        return [
            document.createElement('div'),
            document.createElement('span'),
            document.createElement('p')
        ];
    }

    static verifyChildren = (e) => {
        expect(e.children.length).toBe(3);
        const types = [HTMLDivElement, HTMLSpanElement, HTMLParagraphElement];
        for (let i = 0; i < e.children.length; i++) {
            expect(e.children[i]).toBeInstanceOf(types[i]);
            expect(e.children[i].hasChildNodes()).toBeFalsy();
            expect(e.children[i].parentElement).toBe(e);
        }
    };
}
