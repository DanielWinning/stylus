import IEditorOptions from './Interface/IEditorOptions';
import { StyleOptions } from './Enum/StyleOptions';
import { Toolbar } from './Toolbar';

class Editor
{
    private inputElement: HTMLInputElement;
    private colourScheme: string;
    private toolbar: Toolbar;
    private editor: HTMLDivElement;

    /**
     * @param {IEditorOptions} options
     */
    public constructor(options: IEditorOptions)
    {
        this.setDOMElement(options.targetElement);
        this.setEditorStyles(options.colourScheme ?? StyleOptions.DEFAULT);

        if (!this.inputElement) {
            throw new Error('Editor could not be instantiated, no corresponding DOM Element found.');
        }

        if (this.inputElement.type !== 'text') {
            throw new Error('Rich Text Editor must be instantiated on a text input element.');
        }

        this.buildEditorUI();
    }

    /**
     * @returns {string}
     */
    public getInputValue(): string
    {
        return this.inputElement.value;
    }

    /**
     * @returns {HTMLDivElement}
     */
    public getTextEditor(): HTMLDivElement
    {
        return this.editor;
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
     * @param {string} styleOption
     *
     * @private
     */
    private setEditorStyles(styleOption: string): void
    {
        this.colourScheme = styleOption in StyleOptions
            ? styleOption
            : StyleOptions.DEFAULT;
    }

    /**
     * @private
     */
    private buildEditorUI(): void
    {
        this.inputElement.style.display = 'none';
        this.toolbar = new Toolbar();

        let stylusContainer = document.createElement('div');
        this.editor = document.createElement('div');

        stylusContainer.classList.add('stylus', this.colourScheme);

        this.editor.classList.add('stylus-editor');
        this.editor.setAttribute('contenteditable', '');
        this.editor.addEventListener('change', () => {
            this.inputElement.value = this.editor.innerHTML;
        });

        stylusContainer.append(this.toolbar.getElement());
        stylusContainer.append(this.editor);

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