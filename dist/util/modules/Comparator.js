"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareStrDesc = exports.compareStrAsc = exports.compareNumDesc = exports.compareNumAsc = void 0;
/**
 * 数値比較のコンパレーター（昇順）
 * @param a 前者
 * @param b 比較対象
 */
function compareNumAsc(a, b) {
    return a - b;
}
exports.compareNumAsc = compareNumAsc;
/**
 * 数値比較のコンパレーター（降順）
 * @param a 前者
 * @param b 比較対象
 */
function compareNumDesc(a, b) {
    return b - a;
}
exports.compareNumDesc = compareNumDesc;
/**
 * 文字列比較のコンパレーター（昇順）
 * @param a 前者
 * @param b 比較対象
 */
function compareStrAsc(a, b) {
    if (a > b) {
        return 1;
    }
    else {
        return -1;
    }
}
exports.compareStrAsc = compareStrAsc;
/**
 * 文字列比較のコンパレーター（降順）
 * @param a 前者
 * @param b 比較対象
 */
function compareStrDesc(a, b) {
    if (a < b) {
        return 1;
    }
    else {
        return -1;
    }
}
exports.compareStrDesc = compareStrDesc;
