import { ToolbarButton } from './ToolbarButton';

class Toolbar
{
    private readonly element: HTMLDivElement;
    private buttons: Array<ToolbarButton>;

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

    /**
     * Set up method for creating interactive toolbar buttons.
     *
     * @private
     */
    private createButtons(): void
    {
        let buttons: Array<ToolbarButton> = [];

        buttons.push(
            new ToolbarButton({
                name: 'bold',
                title: 'Bold',
                iconClasses: [
                    'stylus-icon',
                    'stylus-bold',
                ]
            }),
            new ToolbarButton({
                name: 'italic',
                title: 'Italic',
                iconClasses: [
                    'stylus-icon',
                    'stylus-italic',
                ]
            }),
            new ToolbarButton({
                name: 'underline',
                title: 'Underline',
                iconClasses: [
                    'stylus-icon',
                    'stylus-underline',
                ]
            }),
        );

        this.buttons = buttons;

        this.buttons.forEach((button: ToolbarButton) => {
           this.element.append(button.getButton());
        });
    }
}

export { Toolbar };