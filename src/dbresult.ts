import { Cursor, VALUE_TYPE } from "./cursor";

export enum RESULT_TYPE {
    RESULTSASARRAY = 1,
    RESULTSASOBJECT = 2,
    VALUESARENATIVE = 4,
    VALUESARESTRINGS = 8
}

export class DbResult {

    static getResults: Function = DbResult.asRowArrayNative;

    static asRowArrayNative(cursor: Cursor): Array<any> {
        var count = cursor.getColumnCount();
        var results = [];
        for (var i = 0; i < count; i++) {
            var type = cursor.getType(i);
            switch (type) {
                case VALUE_TYPE.NULL:
                    results.push(null);
                    break;

                case VALUE_TYPE.INTEGER:
                    results.push(cursor.getLong(i));
                    break;

                case VALUE_TYPE.FLOAT:
                    results.push(cursor.getFloat(i));
                    break;

                case VALUE_TYPE.STRING:
                    results.push(cursor.getString(i));
                    break;

                case VALUE_TYPE.BLOB:
                    results.push(cursor.getBlob(i));
                    break;

                default:
                    throw new Error('SQLITE - Unknown Field Type ' + type);
            }
        }
        return results;
    }

    static asRowArrayString(cursor: Cursor): Array<string> {
        var count = cursor.getColumnCount();
        var results = new Array<string>();
        for (var i = 0; i < count; i++) {
            var type = cursor.getType(i);
            switch (type) {
                case VALUE_TYPE.NULL:
                    results.push(null);
                    break;

                case VALUE_TYPE.INTEGER:
                    results.push(cursor.getString(i));
                    break;

                case VALUE_TYPE.FLOAT:
                    results.push(cursor.getString(i));
                    break;

                case VALUE_TYPE.STRING:
                    results.push(cursor.getString(i));
                    break;

                case VALUE_TYPE.BLOB:
                    results.push(cursor.getBlob(i));
                    break;

                default:
                    throw new Error('SQLITE - Unknown Field Type ' + type);
            }
        }
        return results;
    }

    static asRowObjectNative(cursor: Cursor): {} {
        var count = cursor.getColumnCount();
        var results = {};
        for (var i = 0; i < count; i++) {
            var type = cursor.getType(i);
            var name = cursor.getColumnName(i);
            switch (type) {
                case VALUE_TYPE.NULL:
                    results[name] = null;
                    break;

                case VALUE_TYPE.INTEGER:
                    results[name] = cursor.getLong(i);
                    break;

                case VALUE_TYPE.FLOAT:
                    results[name] = cursor.getFloat(i);
                    break;

                case VALUE_TYPE.STRING:
                    results[name] = cursor.getString(i);
                    break;

                case VALUE_TYPE.BLOB:
                    results[name] = cursor.getBlob(i);
                    break;

                default:
                    throw new Error('SQLITE - Unknown Field Type ' + type);
            }
        }
        return results;
    }

    static asRowObjectString(cursor: Cursor): {} {
        var count = cursor.getColumnCount();
        var results = {};
        for (var i = 0; i < count; i++) {
            var type = cursor.getType(i);
            var name = cursor.getColumnName(i);
            switch (type) {
                case VALUE_TYPE.NULL:
                    results[name] = null;
                    break;

                case VALUE_TYPE.INTEGER:
                    results[name] = cursor.getString(i);
                    break;

                case VALUE_TYPE.FLOAT:
                    results[name] = cursor.getString(i);
                    break;

                case VALUE_TYPE.STRING:
                    results[name] = cursor.getString(i);
                    break;

                case VALUE_TYPE.BLOB:
                    results[name] = cursor.getBlob(i);
                    break;

                default:
                    throw new Error('SQLITE - Unknown Field Type ' + type);
            }
        }
        return results;
    }

    static setResultValueTypeEngine(resultType: RESULT_TYPE, valueType: RESULT_TYPE) {
        if (resultType === RESULT_TYPE.RESULTSASOBJECT) {
            if (valueType === RESULT_TYPE.VALUESARENATIVE) {
                DbResult.getResults = DbResult.asRowObjectNative;
            } else {
                DbResult.getResults = DbResult.asRowObjectString;
            }
        } else { // RESULTSASARRAY
            if (valueType === RESULT_TYPE.VALUESARENATIVE) {
                DbResult.getResults = DbResult.asRowArrayNative;
            } else {
                DbResult.getResults = DbResult.asRowArrayString;
            }
        }
    }
}