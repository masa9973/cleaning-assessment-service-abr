"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.millisecondToStringTime = void 0;
function millisecondToStringTime(millisecond) {
    const HH = Math.floor(millisecond / 3600000);
    const mm = Math.floor(millisecond / 60000);
    const ss = Math.floor(millisecond / 1000);
    return `${HH}時間${mm}分${ss}秒`;
}
exports.millisecondToStringTime = millisecondToStringTime;
