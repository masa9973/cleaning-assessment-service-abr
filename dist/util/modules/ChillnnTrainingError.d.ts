import { ErrorCode } from '../../entities/type';
export declare class ChillnnTrainingError extends Error {
    chillnnErrorCode: ErrorCode;
    err?: Error;
    constructor(errCode: ErrorCode, err?: Error);
    getMessage(): string;
}
