import { StyleOptions } from './Enum/StyleOptions';

export declare class Editor {
    constructor(options: EditorOptions);
}

export interface EditorOptions {
    targetElement: string | HTMLInputElement;
}

export { StyleOptions };