/**
 * @jest-environment jsdom
 */
import { ToolbarButton } from '../src/ToolbarButton';

afterEach(() => {
    document.body.innerHTML = '';
});

describe('Class: ToolbarButton', () => {
    it('should create an instance of ToolbarButton', () => {
        expect(new ToolbarButton({name: 'test'})).toBeInstanceOf(ToolbarButton);
    });
});