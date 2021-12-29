import { Nullable } from '@battis/typescript-tricks';
import _Array from './lib/_Array';

// typescript is dumb: can't have an interface with an constructor signature (wtf?)
export abstract class JSXComponent {
    protected constructor(properties: object) {
        // intentionally empty
    }

    abstract render(children?: Element[]): Element;
}

export function instanceOfJSXComponent(obj: any): obj is JSXComponent {
    return (
        obj instanceof JSXComponent ||
        (obj && typeof obj['render'] === 'function')
    );
}

export type JSXFunction = (properties?, children?) => Element;

const JSXFactory = {
    // TODO typing seems to _break_ this, because the element implements, rather than extending JSXComponent
    createElement: /*<T extends JSXComponent>*/ (
        element /*: string | JSXFunction | typeof T*/,
        properties: Nullable<object> = {},
        ...children
    ): Element => {
        children = _Array.flatten(children);
        children = children
            .filter((child) => !!child)
            .map((child) => {
                if (child instanceof Element) {
                    return child;
                } else if (instanceOfJSXComponent(child)) {
                    return child.render();
                } else if (typeof child === 'function') {
                    return child();
                } else {
                    return String(child);
                }
            });

        if (typeof element == 'string') {
            // HTML string
            return JSXFactory.parseElement(element, properties, children);
        } else if (typeof element === 'function') {
            // TODO seems like no other way to test if function is actually a constructor - https://stackoverflow.com/a/40922715/294171
            try {
                // JSXComponent stateful class component
                return new element(properties).render(children);
            } catch (classError) {
                try {
                    // JSXFunction stateless function component
                    return element(properties, children);
                } catch (functionError) {
                    console.error({ element, properties, children });
                    throw new TypeError(
                        `element not instantiable:\n${classError}\n\nelement also not callable:\n${functionError}`
                    );
                }
            }
        }
        console.error({ element, properties, children });
        throw new TypeError();
    },

    createFragment: (props, ...children) => {
        return children;
    },

    elementFromSource: (source: string): JSXFunction => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = source;
        return () => wrapper.firstElementChild?.cloneNode(true) as Element;
    },

    parseElement: (
        tagName,
        attributes: Nullable<object> = {},
        ...children
    ): Element => {
        const element = document.createElement(tagName);
        if (attributes) {
            for (const key of Object.getOwnPropertyNames(attributes)) {
                if (/^on/.test(key) && typeof attributes[key] === 'function') {
                    element.addEventListener(
                        key.replace(/^on/, '').toLowerCase(),
                        attributes[key]
                    );
                } else {
                    if (typeof attributes[key] === 'boolean') {
                        element[key] = attributes[key];
                    } else {
                        element.setAttribute(key, attributes[key]);
                    }
                }
            }
        }

        const recursiveAppendChild = (parent, child) => {
            if (child) {
                if (Array.isArray(child)) {
                    for (const nestedChild of child) {
                        recursiveAppendChild(parent, nestedChild);
                    }
                } else {
                    parent.appendChild(
                        child.nodeType ? child : document.createTextNode(child)
                    );
                }
            }
        };

        for (const child of children) {
            recursiveAppendChild(element, child);
        }
        return element;
    }
};
export default JSXFactory;
