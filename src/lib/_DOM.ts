import Component from '../Component';
import _Array from './_Array';

export const render = (
    target: string | Element | Component | string[] | Element[] | Component[],
    content?: string | Element | Component | string[] | Element[] | Component[]
): void => {
    if (!content) {
        content = target;
        target = process.env.ROOT_SELECTOR || document.body;
    }
    if (typeof target === 'string') {
        target = document.querySelector(target) as Element;
    }
    if (target) {
        if (target instanceof Component) {
            target = target.element;
        }
        if (content instanceof Component) {
            content = content.render();
        }
        if (target && target instanceof Element) {
            if (typeof content === 'string') {
                target.innerHTML = content;
            } else if (content instanceof Element) {
                target.innerHTML = '';
                target.appendChild(content);
            } else if (Array.isArray(content)) {
                renderFragment(target, content);
            }
        }
    }
};

export const renderFragment = (
    target: string | Element | Component | string[] | Element[] | Component[],
    content?: string[] | Element[] | Component[]
) => {
    content = _Array.flatten(content);
    if (!content && Array.isArray(target)) {
        content = target;
        target = process.env.ROOT_SELECTOR || document.body;
    }
    if (typeof target === 'string') {
        target = document.querySelector(target) as Element;
    }
    if (target instanceof Component) {
        target = target.element;
    }
    if (target && content && target instanceof Element) {
        target.innerHTML = '';
        for (let element of content) {
            if (element instanceof Component) {
                element = element.render();
            }
            if (typeof element === 'string') {
                target.innerHTML += element;
            } else {
                target.appendChild(element);
            }
        }
    }
};

const _DOM = {
    render,
    renderFragment,

    /**
     * @see {@link https://stackoverflow.com/a/22638396/294171|Stack Overflow}
     * @param element
     */
    getStylesFor: (element): CSSStyleRule[] => {
        const sheets = document.styleSheets;
        const styles: CSSStyleRule[] = [];
        element.matches =
            element.matches ||
            element.webkitMatchesSelector ||
            element.mozMatchesSelector ||
            element.msMatchesSelector ||
            element.oMatchesSelector;
        for (const sheetsKey of Object.getOwnPropertyNames(sheets)) {
            const rules = sheets[sheetsKey].rules || sheets[sheetsKey].cssRules;
            for (const rulesKey of Object.getOwnPropertyNames(rules)) {
                const rule = rules[rulesKey];
                if (
                    rule instanceof CSSStyleRule &&
                    element.matches(rule.selectorText)
                ) {
                    styles.push(rule);
                }
            }
        }
        return styles;
    },

    waitFor: (root, selector, callback) => {
        new MutationObserver((mutations, observer) => {
            for (const mutation of mutations) {
                let done = false;
                mutation.addedNodes.forEach(node => {
                    const selectee = (node as HTMLElement).querySelector(
                        selector
                    );
                    if (selectee) {
                        done = true;
                        callback(selectee);
                    }
                });
                if (done) {
                    observer.disconnect();
                    return;
                }
            }
        }).observe(root, { childList: true, subtree: true });
    },

    rectContains: (bounds: DOMRect, x, y) => {
        return (
            bounds.left <= x &&
            x <= bounds.right &&
            bounds.top <= y &&
            y <= bounds.bottom
        );
    }
};
export default _DOM;
