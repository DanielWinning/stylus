import IEditorOptions from './Interface/IEditorOptions';

class Editor
{
    inputElement: HTMLInputElement;

    /**
     * @param {IEditorOptions} options
     */
    public constructor(options: IEditorOptions)
    {
        this.setDOMElement(options.targetElement);

        if (!this.inputElement) {
            throw new Error('Editor could not be instantiated, no corresponding DOM Element found.');
        }

        if (this.inputElement.type !== 'text') {
            throw new Error('Rich Text Editor must be instantiated on a text input element.');
        }

        this.buildEditorUI();
    }

    /**
     * @param {Element|string} targetElement
     *
     * @private
     */
    private setDOMElement(targetElement: HTMLInputElement|string): void
    {
        this.inputElement = targetElement instanceof HTMLInputElement
            ? targetElement
            : document.querySelector(targetElement) ?? null;
    }

    /**
     * @private
     */
    private buildEditorUI(): void
    {
        this.inputElement.style.display = 'none';

        let stylusContainer = document.createElement('div');
        stylusContainer.classList.add('stylus');

        this.inputElement.parentNode.insertBefore(stylusContainer, this.inputElement.nextSibling);
    }
}

/**
 * Builds all Rich Text Editors on the page using default options.
 *
 * @param {string} selector
 *
 * @returns {Array<Editor>}
 */
function buildAllRichTextEditors(selector: string): Array<Editor>
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