import { StyleOptions } from '../Enum/StyleOptions';

export default class StyleUtils
{
    /**
     * @param {string} styleOption
     *
     * @returns {boolean}
     */
    public static isValidStyleOption(styleOption: string): boolean
    {
        return Object.values<string>(StyleOptions).includes(styleOption);
    }
}