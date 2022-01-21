export function timeStampToStringTime(timeStamp: number):string {
    const date = new Date(timeStamp);
    const HH = `0${date.getHours()}`.slice(-2);
    const mm = `0${date.getMinutes()}`.slice(-2);
    const ss = `0${date.getSeconds()}`.slice(-2);
    return `${HH}:${mm}:${ss}`
}