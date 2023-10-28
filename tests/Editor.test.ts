/**
 * @jest-environment jsdom
 */
import { Editor, buildAllRichTextEditors } from '../src/Editor';

afterEach(() => {
    document.body.innerHTML = '';
});

describe('Class: Editor', () => {
    it('should create an instance of Editor', () => {
        let input: HTMLInputElement = document.createElement('input');
        input.classList.add('rte');
        document.body.append(input);

        const editor = new Editor({
            targetElement: '.rte'
        });
        expect(editor).toBeInstanceOf(Editor);
    });

    it('should create an instance of Editor on passed Element', () => {
        let input = document.createElement('input');
        input.type = 'text';
        document.body.append(input);

        const editor = new Editor({targetElement: input});
        expect(editor).toBeInstanceOf(Editor);
    });

    it('throws an error when targetElement is not found by selector', () => {
        expect(() => {
            new Editor({targetElement: '.rte'});
        }).toThrowError('Editor could not be instantiated, no corresponding DOM Element found.');
    });

    it('throws an error when targetElement is not an HTMLInputElement', () => {
        expect(() => {
            let el = document.createElement('div');
            el.classList.add('rte');
            document.body.append(el);

            new Editor({targetElement: '.rte'});
        }).toThrowError('Rich Text Editor must be instantiated on a text input element.');
    });

    it('updates input when contents changed', () => {
        let el = document.createElement('input');
        el.type = 'text';
        document.body.append(el);

        let editor = new Editor({targetElement: el});

        expect(editor.getInputValue()).toBe('');

        editor.getTextEditor().innerHTML = 'Test string';
        editor.getTextEditor().dispatchEvent(new Event('change'));

        expect(editor.getInputValue()).toBe('Test string');
    });
});

describe('Helper: buildAllRichTextEditors', () => {
   it('should build no editors when selector does not exist on page', () => {
      expect(buildAllRichTextEditors('.test')).toStrictEqual([]);
   });
   it('should build editors when selector exists', () => {
      let input = document.createElement('input');
      input.type = 'text';
      input.classList.add('rte');
      document.body.append(input);

      expect(buildAllRichTextEditors('.rte')).toHaveLength(1);
   });
});