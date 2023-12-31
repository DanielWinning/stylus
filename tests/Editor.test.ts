/**
 * @jest-environment jsdom
 */
import { Editor, buildAllRichTextEditors } from '../src/Editor';
import { StyleOptions } from '../src/Enum/StyleOptions';
import { Messages } from '../src/Enum/Messages';

afterEach(() => {
    document.body.innerHTML = '';
});

describe('Class: Editor', () => {
    it('should create an instance of Editor when targetElement is a valid CSS selector', () => {
        createTestInputElement();

        const editor = new Editor({
            targetElement: '.rte'
        });
        expect(editor).toBeInstanceOf(Editor);
    });

    it('should create an instance of Editor on passed Element', () => {
        let input = createTestInputElement();

        const editor = new Editor({targetElement: input});
        expect(editor).toBeInstanceOf(Editor);
    });

    it('throws an error when targetElement is not found by selector', () => {
        expect(() => {
            new Editor({targetElement: '.rte'});
        }).toThrowError(Messages.ERROR_NO_DOM_ELEMENT);
    });

    it('throws an error when targetElement is not an HTMLInputElement', () => {
        expect(() => {
            let el = document.createElement('div');
            el.classList.add('rte');
            document.body.append(el);

            new Editor({targetElement: '.rte'});
        }).toThrowError(Messages.ERROR_NOT_ON_TEXT_INPUT);
    });

    it('updates input when contents changed', () => {
        let el = createTestInputElement(),
            editor = new Editor({targetElement: el});

        expect(editor.getInputValue()).toBe('');

        editor.getTextEditor().innerHTML = 'Test string';
        editor.getTextEditor().dispatchEvent(new Event('change'));

        expect(editor.getInputValue()).toBe('Test string');
    });

    it('applies the default style if an invalid or no style option is provided', () => {
        let el = createTestInputElement();

        new Editor({targetElement: el});

        expect(document.querySelector('#test')).toBeTruthy();
        expect(document.querySelector('.stylus').classList.contains(StyleOptions.DEFAULT)).toBeTruthy();

        clearDOM();
        el = createTestInputElement();

        new Editor({targetElement: el, colourScheme: 'invalid-scheme'});

        expect(document.querySelector('#test')).toBeTruthy();
        expect(
            document.querySelector('.stylus').classList.contains(StyleOptions.DEFAULT)
        ).toBeTruthy();
    });

    it('applies the style based on valid provided style option', () => {
        let el = createTestInputElement();

        new Editor({targetElement: el, colourScheme: StyleOptions.NONE});

        expect(
            document.querySelector('.stylus').classList.contains(StyleOptions.NONE)
        ).toBeTruthy();
    });
});

describe('Helper: buildAllRichTextEditors', () => {
   it('should build no editors when selector does not exist on page', () => {
      expect(buildAllRichTextEditors('.test')).toStrictEqual([]);
   });
   it('should build editors when selector exists', () => {
      createTestInputElement();

      expect(buildAllRichTextEditors('.rte')).toHaveLength(1);
   });
});

/**
 * @returns {HTMLInputElement}
 */
function createTestInputElement(): HTMLInputElement
{
    let el = document.createElement('input');

    el.type = 'text';
    el.id = 'test';
    el.classList.add('rte');
    document.body.append(el);

    return el;
}

/**
 * @returns {void}
 */
function clearDOM(): void
{
    document.body.innerHTML = '';
}