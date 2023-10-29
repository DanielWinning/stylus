/**
 * @jest-environment jsdom
 */
import { ToolbarButton } from '../src/ToolbarButton';
import { Messages } from '../src/Enum/Messages';

afterEach(() => {
    document.body.innerHTML = '';
});

describe('Class: ToolbarButton', () => {
    it('should create an instance of ToolbarButton', () => {
        expect(new ToolbarButton({name: 'test', title: 'Test'})).toBeInstanceOf(ToolbarButton);
    });

    it('should create a HTMLButtonElement', () => {
        let toolbarButton = new ToolbarButton({name: 'test', title: 'Test'});

        expect(toolbarButton.getButton()).toBeInstanceOf(HTMLButtonElement);
        expect(toolbarButton.getButton().type).toBe('button');
        expect(toolbarButton.getButton().value).toBe('test');
        expect(toolbarButton.getButton().innerHTML).toBe('Test');

        let formElement = document.createElement('form'),
            formToolbarButton = new ToolbarButton({name: 'test', title: 'Test'});

        formElement.append(formToolbarButton.getButton());
        document.body.append(formElement);

        expect(formToolbarButton.getButton().type).toBe('button');
        expect(formToolbarButton.getButton().value).toBe('test');
        expect(formToolbarButton.getButton().innerHTML).toBe('Test');
    });

    it('throws an error when title is empty and icon classes are empty', () => {
        expect(() => {
            new ToolbarButton({
                name: 'test',
                title: '',
            });
        }).toThrowError(Messages.ERROR_NO_TOOLBAR_BUTTON_HTML_PROVIDED);
    });

    it('should create FontAwesome icon when provided classes', () => {
        let boldButton = new ToolbarButton({
            name: 'bold',
            title: 'Bold',
            iconClasses: [
                'fa-solid',
                'fa-bold',
            ]
        });
        expect(boldButton.getButton().innerHTML).toBe('<i class="fa-solid fa-bold"></i>');
    });
});