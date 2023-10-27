import { Editor, buildAllRichTextEditors } from '../src/Editor';

const DOM: Array<any> = [
    HTMLInputElement,
];

describe('Editor Class', () => {
    it('should create an instance of Editor', () => {
        let input: HTMLInputElement = document.createElement('input');
        input.classList.add('rte');
        document.body.append(input);

        const editor = new Editor({
            targetElement: '.rte'
        });
        expect(editor).toBeInstanceOf(Editor);
    });
});