export function millisecondToStringTime(millisecond: number):string {
    const HH = Math.floor(millisecond / 3600000)%24;
    const mm = Math.floor(millisecond / 60000)%60;
    const ss = Math.floor(millisecond / 1000)%60;
    return `${HH}時間${mm}分${ss}秒`;
}