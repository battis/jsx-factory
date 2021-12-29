import { Nullable, Optional } from '@battis/typescript-tricks';
import JSXFactory, { JSXComponent } from './JSXFactory';
import { render } from './lib/_DOM';

export type ComponentConfig =
    | Element // Element to wrap
    | string // raw HTML to wrap
    | object; // properties to add to default <div/>

export type ComponentizedElement = Element & { component: Component };

export function instanceOfComponentizedElement(
    obj: any
): obj is ComponentizedElement {
    return obj instanceof Element && 'component' in obj;
}

export default class Component implements JSXComponent {
    private bindTo(element: Element): ComponentizedElement {
        element['component'] = this;
        return element as ComponentizedElement;
    }

    protected _element: Nullable<ComponentizedElement> = null;

    public getElement(): ComponentizedElement {
        return this._element || this.bindTo(this.render());
    }

    public get element(): ComponentizedElement {
        return this.getElement();
    }

    public set element(element: Element) {
        this.setElement(element);
    }

    public get htmlElement(): Optional<HTMLElement> {
        if (this.element instanceof HTMLElement) {
            return this.element;
        }
        return undefined;
    }

    /**
     * Caution: replacing an element that is observed or has event listeners will NOT transfer that observation
     * @param element
     */
    public setElement(element: Element) {
        const _element = this.bindTo(element);
        if (this._element?.isConnected) {
            this._element.parentElement?.replaceChild(_element, this._element);
        }
        this._element = _element;
    }

    public get children() {
        return this.getChildren();
    }

    public getChildren() {
        // TODO convert to an iterable type?
        return this._element?.children;
    }

    public constructor(element?: ComponentConfig) {
        if (element) {
            if (element instanceof HTMLElement) {
                this.element = element;
            } else if (typeof element === 'object') {
                this.element = <div {...element} />;
            } else {
                this.element = JSXFactory.elementFromSource(element)();
            }
        }
    }

    public render(children?: Element[]): Element {
        if (this._element && children) {
            render(this._element, children);
            return this._element;
        } else {
            return (this.element = <div>{children}</div>);
        }
    }

    public static for<T extends typeof Component>(
        this: T,
        element: Element
    ): Nullable<InstanceType<T>> {
        if (
            instanceOfComponentizedElement(element) &&
            element.component instanceof this
        ) {
            return element.component as InstanceType<T>;
        } else {
            return null;
        }
    }

    public static querySelector<T extends typeof Component>(
        this: T,
        selector: string,
        root: Component | Element | Document = document
    ) {
        const element = (
            root instanceof Component ? root.element : root
        ).querySelector(selector);
        if (element) {
            const component = this.for(element);
            if (component) {
                return component;
            }
        }
        return null;
    }

    public static querySelectorAll<T extends typeof Component>(
        this: T,
        selector: string,
        root: Component | Element | Document = document
    ): InstanceType<T>[] {
        const instances: InstanceType<T>[] = [];
        (root instanceof Component ? root.element : root)
            .querySelectorAll(selector)
            .forEach(element => {
                const component = this.for(element);
                if (component instanceof this) {
                    instances.push(component);
                }
            });
        return instances;
    }

    public static parent<T extends typeof Component>(
        this: T,
        element: Element
    ): Nullable<InstanceType<T>> {
        let current: Nullable<Element> = element;
        do {
            const component = this.for(current);
            if (component instanceof this) {
                return component;
            } else {
                current = current.parentElement;
            }
        } while (current);
        return null;
    }

    public get isConnected() {
        return !!this._element?.isConnected;
    }
}
