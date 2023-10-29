/**
 * @jest-environment jsdom
 */
import { ToolbarButton } from '../src/ToolbarButton';

afterEach(() => {
    document.body.innerHTML = '';
});

describe('Class: ToolbarButton', () => {
    it('should create an instance of ToolbarButton', () => {
        expect(new ToolbarButton({name: 'test', displayName: 'Test'})).toBeInstanceOf(ToolbarButton);
    });

    it('should create a HTMLButtonElement', () => {
        let toolbarButton = new ToolbarButton({name: 'test', displayName: 'Test'});

        expect(toolbarButton.getButton()).toBeInstanceOf(HTMLButtonElement);
        expect(toolbarButton.getButton().type).toBe('button');
        expect(toolbarButton.getButton().value).toBe('test');
        expect(toolbarButton.getButton().innerHTML).toBe('Test');

        let formElement = document.createElement('form'),
            formToolbarButton = new ToolbarButton({name: 'test', displayName: 'Test'});

        formElement.append(formToolbarButton.getButton());
        document.body.append(formElement);

        expect(formToolbarButton.getButton().type).toBe('button');
        expect(formToolbarButton.getButton().value).toBe('test');
        expect(formToolbarButton.getButton().innerHTML).toBe('Test');
    });
});