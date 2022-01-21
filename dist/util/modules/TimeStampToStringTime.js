"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeStampToStringTime = void 0;
function timeStampToStringTime(timeStamp) {
    const date = new Date(timeStamp);
    const HH = `0${date.getHours()}`.slice(-2);
    const mm = `0${date.getMinutes()}`.slice(-2);
    const ss = `0${date.getSeconds()}`.slice(-2);
    return `${HH}:${mm}:${ss}`;
}
exports.timeStampToStringTime = timeStampToStringTime;
