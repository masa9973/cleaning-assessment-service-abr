"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateFormatter = void 0;
function dateFormatter(timeStamp) {
    const date = new Date(timeStamp);
    // .slice(-2)で文字列中の末尾の2文字を取得する
    // `0${date.getHoge()}`.slice(-2) と書くことで０埋めをする
    const MM = `0${date.getMonth() + 1}`.slice(-2); // getMonth()の返り値は0が基点なので１増やす
    const dd = `0${date.getDate()}`.slice(-2);
    return `${MM}/${dd}`;
}
exports.dateFormatter = dateFormatter;
