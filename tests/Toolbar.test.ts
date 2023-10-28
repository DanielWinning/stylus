/**
 * @jest-environment jsdom
 */
import { Toolbar, ToolbarButton } from "../src/Toolbar";

afterEach(() => {
    document.body.innerHTML = '';
});

describe('Class: Toolbar', () => {
   it('should create an instance of Toolbar', () => {
       expect(new Toolbar()).toBeInstanceOf(Toolbar);
   });
   it('creates a toolbar DOM element', () => {
       let tb: Toolbar = new Toolbar();

       expect(tb.getElement()).toBeInstanceOf(HTMLDivElement);
       expect(tb.getElement().classList.contains('stylus-toolbar')).toBeTruthy();
   });
});

describe('Class: ToolbarButton', () => {
   it('should create an instance of ToolbarButton', () => {
       expect(new ToolbarButton({name: 'test'})).toBeInstanceOf(ToolbarButton);
   });
});