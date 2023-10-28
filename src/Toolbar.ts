import { IToolbarButtonOptions } from './Interface/IToolbarButtonOptions';

class Toolbar
{
    element: HTMLDivElement;
    buttons: Array<ToolbarButton>;

    constructor()
    {
        this.element = document.createElement('div');
        this.element.classList.add('stylus-toolbar');

        this.createButtons();
    }

    /**
     * @returns {HTMLDivElement}
     */
    public getElement(): HTMLDivElement
    {
        return this.element;
    }

    private createButtons(): void
    {
        let buttons: Array<ToolbarButton> = [];

        buttons.push(
            new ToolbarButton({
                name: 'bold',
            }),
            new ToolbarButton({
                name: 'italic',
            }),
            new ToolbarButton({
                name: 'underline',
            }),
        );

        this.buttons = buttons;
    }
}

class ToolbarButton
{
    name: string;

    constructor(options: IToolbarButtonOptions) {
        this.name = options.name;
    }
}

export { Toolbar, ToolbarButton };