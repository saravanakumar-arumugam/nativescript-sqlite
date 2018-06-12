import { Cursor } from "./cursor";
export declare enum RESULT_TYPE {
    RESULTSASARRAY = 1,
    RESULTSASOBJECT = 2,
    VALUESARENATIVE = 4,
    VALUESARESTRINGS = 8
}
export declare class DbResult {
    static getResults: Function;
    static asRowArrayNative(cursor: Cursor): Array<any>;
    static asRowArrayString(cursor: Cursor): Array<string>;
    static asRowObjectNative(cursor: Cursor): {};
    static asRowObjectString(cursor: Cursor): {};
    static setResultValueTypeEngine(resultType: RESULT_TYPE, valueType: RESULT_TYPE): void;
}
