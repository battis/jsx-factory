import Identifier from '@battis/identifier';
import JSXFactory from '../JSXFactory';
import { Nullable } from '@battis/typescript-tricks';
import { render } from './_DOM';

export type HtmlAsyncSelectElement = HTMLSelectElement & { load: () => any };
type OptionHandler = (event: Event, control: HtmlAsyncSelectElement) => any;
type Option = {
    id?: string;
    name: string;
    disabled?: boolean;
    handler?: OptionHandler;
};
type OptionGroup = Option[];
type AsyncSelectControlConfig = {
    name: string;
    value: Nullable<string>;
    resizing?: boolean;
    loader: (...args) => Promise<OptionGroup | OptionGroup[]>;
};

const _HTML = {
    asyncSelectControl: ({
        name,
        value,
        resizing = true,
        loader
    }: AsyncSelectControlConfig): HTMLSelectElement => {
        const control: HtmlAsyncSelectElement = (
            <select name={name} disabled={true}>
                <option disabled={true} selected={true} value="">
                    Loading&hellip;
                </option>
            </select>
        );

        const handlers = {};

        const renderOption = (option: Option) => {
            const params = {};
            if (option.id) {
                params['value'] = option.id;
            }
            if (option.handler) {
                if (!('value' in params)) {
                    params[
                        'value'
                    ] = `asyncSelectControl@${Identifier.identifier()}`;
                }
                handlers[params['value']] = option.handler;
            }
            return (
                <option
                    selected={option.id === value}
                    disabled={!!option.disabled}
                    {...params}
                >
                    {option.name}
                </option>
            );
        };

        const renderOptionGroup = (options, parent) => {
            render(parent, options.map(renderOption));
        };

        control.load = (...args) => {
            loader(...args).then(options => {
                if (!resizing) {
                    control.style.width = `${control.clientWidth}px`;
                }
                control.innerHTML = '';
                for (const option of options) {
                    if (Array.isArray(option)) {
                        const group = <optgroup />;
                        renderOptionGroup(option, group);
                        control.appendChild(group);
                    } else {
                        control.appendChild(renderOption(option));
                    }
                }
                if (Object.getOwnPropertyNames(handlers).length) {
                    control.onchange = event => {
                        if (control.value in handlers) {
                            event.stopPropagation();
                            handlers[control.value](event, control);
                        }
                    };
                }
                control.disabled = false;
            });
        };
        control.load();
        return control;
    }
};
export default _HTML;
