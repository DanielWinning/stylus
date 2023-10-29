import { IToolbarButtonOptions } from './Interface/IToolbarButtonOptions';

class ToolbarButton
{
    private name: string;
    private element: HTMLButtonElement;

    constructor(options: IToolbarButtonOptions) {
        this.name = options.name;

        this.createButton(options.displayName);
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
    private createButton(displayName: string): void
    {
        this.element = document.createElement('button');
        this.element.type = 'button';
        this.element.value = displayName;
    }
}

export { ToolbarButton };