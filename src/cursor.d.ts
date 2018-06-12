export declare interface Cursor {
    getCount(): number;
    getColumnCount(): number;
    getColumnName(column: any): string;
    getType(column: any): VALUE_TYPE;
    getLong(column: any): number;
    getFloat(column: any): number;
    getString(column: any): string;
    getBlob(column: any): any;
    moveToFirst(): void;
    moveToNext(): void;
    close(): void;
}
export declare enum VALUE_TYPE {
    NULL = 0,
    INTEGER = 1,
    FLOAT = 2,
    STRING = 3,
    BLOB = 4
}
