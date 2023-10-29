import { IToolbarButtonOptions } from './Interface/IToolbarButtonOptions';

class ToolbarButton
{
    private name: string;
    private element: HTMLButtonElement;

    constructor(options: IToolbarButtonOptions) {
        this.name = options.name;

        this.createButton(options.name, options.displayName);
    }

    /**
     * @returns {HTMLButtonElement}
     */
    public getButton(): HTMLButtonElement
    {
        return this.element;
    }

    /**
     * @private
     */
    private createButton(value: string, displayName: string): void
    {
        this.element = document.createElement('button');
        this.element.type = 'button';
        this.element.value = value;
        this.element.innerHTML = displayName;
    }
}

export { ToolbarButton };