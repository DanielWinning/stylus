import IEditorOptions from './Interface/IEditorOptions';

class Editor
{
    private element: HTMLInputElement;

    /**
     * @param {IEditorOptions} options
     */
    public constructor(options: IEditorOptions)
    {
        this.setDOMElement(options.targetElement);

        if (!this.element) {
            throw new Error('Editor could not be instantiated, no corresponding DOM Element found.');
        }

        if (this.element.type !== 'text') {
            throw new Error('Rich Text Editor must be instantiated on a text input element.');
        }
    }

    /**
     * @param {Element|string} targetElement
     *
     * @private
     */
    private setDOMElement(targetElement: HTMLInputElement|string): void
    {
        this.element = targetElement instanceof HTMLInputElement
            ? targetElement
            : document.querySelector(targetElement) ?? null;
    }
}

/**
 * Builds all Rich Text Editors on the page using default options.
 *
 * @param {string} selector
 *
 * @returns {Array<Editor>}
 */
function buildAllRichTextEditors(selector: string = '.rte'): Array<Editor>
{
    let editors: Array<Editor> = [];

    document.querySelectorAll(selector).forEach((el: HTMLInputElement) => {
        editors.push(new Editor({
            targetElement: el
        }));
    });

    return editors;
}

export { Editor, buildAllRichTextEditors };