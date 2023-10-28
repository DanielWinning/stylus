import { IToolbarButtonOptions } from './Interface/IToolbarButtonOptions';

class ToolbarButton
{
    private name: string;

    constructor(options: IToolbarButtonOptions) {
        this.name = options.name;
    }
}

export { ToolbarButton };