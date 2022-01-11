/**
 * 数値比較のコンパレーター（昇順）
 * @param a 前者
 * @param b 比較対象
 */
 export function compareNumAsc(a: number, b: number) {
    return a - b;
}
/**
 * 数値比較のコンパレーター（降順）
 * @param a 前者
 * @param b 比較対象
 */
export function compareNumDesc(a: number, b: number) {
    return b - a;
}
/**
 * 文字列比較のコンパレーター（昇順）
 * @param a 前者
 * @param b 比較対象
 */
export function compareStrAsc(a: string, b: string) {
    if (a > b) {
        return 1;
    } else {
        return -1;
    }
}
/**
 * 文字列比較のコンパレーター（降順）
 * @param a 前者
 * @param b 比較対象
 */
export function compareStrDesc(a: string, b: string) {
    if (a < b) {
        return 1;
    } else {
        return -1;
    }
}