import _Array from './src/lib/_Array';
import _DOM, { render, renderFragment } from './src/lib/_DOM';
import _HTML, { HtmlAsyncSelectElement } from './src/lib/_HTML';
import _Object from './src/lib/_Object';
import Component from './src/Component';
import JSXFactory, { JSXFunction, JSXComponent } from './src/JSXFactory'

export {
    _Array,
    _DOM,
    render,
    renderFragment,
    _HTML,
    HtmlAsyncSelectElement,
    _Object
}

export { Component }

export {
    JSXFactory,
    JSXFunction,
    JSXComponent,
}

export default JSXFactory;