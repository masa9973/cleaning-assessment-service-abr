import { ErrorCode } from '../../entities/type';

export class ChillnnTrainingError extends Error {
    public chillnnErrorCode: ErrorCode;
    public err?: Error;
    constructor(errCode: ErrorCode, err?: Error) {
        super(errCode);
        this.chillnnErrorCode = errCode;
        this.err = err;
    }

    public getMessage(): string {
        return errorMessages[this.chillnnErrorCode] || errorMessages[ErrorCode.chillnnTraining_500_systemError];
    }
}

const errorMessages: { [T in keyof typeof ErrorCode]: string } = {
    chillnnTraining_400_badRequest: '不正なリクエストです',
    chillnnTraining_401_notSignIn: 'サインインしていません',
    chillnnTraining_404_resourceNotFound: 'リソースが見つかりません',
    chillnnTraining_500_systemError: 'システムエラーです',
};