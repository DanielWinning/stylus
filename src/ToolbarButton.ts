import { IToolbarButtonOptions } from './Interface/IToolbarButtonOptions';
import { Messages } from './Enum/Messages';

class ToolbarButton
{
    private name: string;
    private element: HTMLButtonElement;

    constructor(options: IToolbarButtonOptions) {
        this.name = options.name;

        this.createButton(options);
    }

    /**
     * @returns {HTMLButtonElement}
     */
    public getButton(): HTMLButtonElement
    {
        return this.element;
    }

    /**
     * @param {IToolbarButtonOptions} options
     *
     * @private
     */
    private createButton(options: IToolbarButtonOptions): void
    {
        this.element = document.createElement('button');
        this.element.type = 'button';
        this.element.value = options.name;
        this.element.classList.add('stylus-button');
        this.element.title = options.title;

        if (options.iconClasses && options.iconClasses.length) {
            let icon = document.createElement('i');

            icon.classList.add(...options.iconClasses);

            this.element.append(icon);

            return;
        }

        if (options.title !== '') {
            this.element.innerHTML = options.title;

            return;
        }

        throw new Error(Messages.ERROR_NO_TOOLBAR_BUTTON_HTML_PROVIDED);
    }
}

export { ToolbarButton };