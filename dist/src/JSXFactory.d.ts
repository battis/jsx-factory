import { Nullable, Constructor } from "@battis/typescript-tricks";
export declare abstract class JSXComponent {
    protected constructor(properties: object);
    abstract render(children?: Element[]): Element;
}
export declare function instanceOfJSXComponent(obj: any): obj is JSXComponent;
export declare type JSXFunction = (properties?: any, children?: any) => Element;
export default class JSXFactory {
    static createElement(element: string | JSXFunction | Constructor<JSXComponent>, properties?: Nullable<object>, ...children: any[]): Element;
    static createFragment(props: any, ...children: any[]): any[];
    static elementFromSource(source: string): JSXFunction;
    static parseElement(tagName: any, attributes?: Nullable<object>, ...children: any[]): Element;
}
