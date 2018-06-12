"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cursor_1 = require("./cursor");
var RESULT_TYPE;
(function (RESULT_TYPE) {
    RESULT_TYPE[RESULT_TYPE["RESULTSASARRAY"] = 1] = "RESULTSASARRAY";
    RESULT_TYPE[RESULT_TYPE["RESULTSASOBJECT"] = 2] = "RESULTSASOBJECT";
    RESULT_TYPE[RESULT_TYPE["VALUESARENATIVE"] = 4] = "VALUESARENATIVE";
    RESULT_TYPE[RESULT_TYPE["VALUESARESTRINGS"] = 8] = "VALUESARESTRINGS";
})(RESULT_TYPE = exports.RESULT_TYPE || (exports.RESULT_TYPE = {}));
class DbResult {
    static asRowArrayNative(cursor) {
        var count = cursor.getColumnCount();
        var results = [];
        for (var i = 0; i < count; i++) {
            var type = cursor.getType(i);
            switch (type) {
                case cursor_1.VALUE_TYPE.NULL:
                    results.push(null);
                    break;
                case cursor_1.VALUE_TYPE.INTEGER:
                    results.push(cursor.getLong(i));
                    break;
                case cursor_1.VALUE_TYPE.FLOAT:
                    results.push(cursor.getFloat(i));
                    break;
                case cursor_1.VALUE_TYPE.STRING:
                    results.push(cursor.getString(i));
                    break;
                case cursor_1.VALUE_TYPE.BLOB:
                    results.push(cursor.getBlob(i));
                    break;
                default:
                    throw new Error('SQLITE - Unknown Field Type ' + type);
            }
        }
        return results;
    }
    static asRowArrayString(cursor) {
        var count = cursor.getColumnCount();
        var results = new Array();
        for (var i = 0; i < count; i++) {
            var type = cursor.getType(i);
            switch (type) {
                case cursor_1.VALUE_TYPE.NULL:
                    results.push(null);
                    break;
                case cursor_1.VALUE_TYPE.INTEGER:
                    results.push(cursor.getString(i));
                    break;
                case cursor_1.VALUE_TYPE.FLOAT:
                    results.push(cursor.getString(i));
                    break;
                case cursor_1.VALUE_TYPE.STRING:
                    results.push(cursor.getString(i));
                    break;
                case cursor_1.VALUE_TYPE.BLOB:
                    results.push(cursor.getBlob(i));
                    break;
                default:
                    throw new Error('SQLITE - Unknown Field Type ' + type);
            }
        }
        return results;
    }
    static asRowObjectNative(cursor) {
        var count = cursor.getColumnCount();
        var results = {};
        for (var i = 0; i < count; i++) {
            var type = cursor.getType(i);
            var name = cursor.getColumnName(i);
            switch (type) {
                case cursor_1.VALUE_TYPE.NULL:
                    results[name] = null;
                    break;
                case cursor_1.VALUE_TYPE.INTEGER:
                    results[name] = cursor.getLong(i);
                    break;
                case cursor_1.VALUE_TYPE.FLOAT:
                    results[name] = cursor.getFloat(i);
                    break;
                case cursor_1.VALUE_TYPE.STRING:
                    results[name] = cursor.getString(i);
                    break;
                case cursor_1.VALUE_TYPE.BLOB:
                    results[name] = cursor.getBlob(i);
                    break;
                default:
                    throw new Error('SQLITE - Unknown Field Type ' + type);
            }
        }
        return results;
    }
    static asRowObjectString(cursor) {
        var count = cursor.getColumnCount();
        var results = {};
        for (var i = 0; i < count; i++) {
            var type = cursor.getType(i);
            var name = cursor.getColumnName(i);
            switch (type) {
                case cursor_1.VALUE_TYPE.NULL:
                    results[name] = null;
                    break;
                case cursor_1.VALUE_TYPE.INTEGER:
                    results[name] = cursor.getString(i);
                    break;
                case cursor_1.VALUE_TYPE.FLOAT:
                    results[name] = cursor.getString(i);
                    break;
                case cursor_1.VALUE_TYPE.STRING:
                    results[name] = cursor.getString(i);
                    break;
                case cursor_1.VALUE_TYPE.BLOB:
                    results[name] = cursor.getBlob(i);
                    break;
                default:
                    throw new Error('SQLITE - Unknown Field Type ' + type);
            }
        }
        return results;
    }
    static setResultValueTypeEngine(resultType, valueType) {
        if (resultType === RESULT_TYPE.RESULTSASOBJECT) {
            if (valueType === RESULT_TYPE.VALUESARENATIVE) {
                DbResult.getResults = DbResult.asRowObjectNative;
            }
            else {
                DbResult.getResults = DbResult.asRowObjectString;
            }
        }
        else { // RESULTSASARRAY
            if (valueType === RESULT_TYPE.VALUESARENATIVE) {
                DbResult.getResults = DbResult.asRowArrayNative;
            }
            else {
                DbResult.getResults = DbResult.asRowArrayString;
            }
        }
    }
}
DbResult.getResults = DbResult.asRowArrayNative;
exports.DbResult = DbResult;
