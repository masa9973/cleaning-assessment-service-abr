"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChillnnTrainingError = void 0;
const type_1 = require("../../entities/type");
class ChillnnTrainingError extends Error {
    constructor(errCode, err) {
        super(errCode);
        this.chillnnErrorCode = errCode;
        this.err = err;
    }
    getMessage() {
        return errorMessages[this.chillnnErrorCode] || errorMessages[type_1.ErrorCode.chillnnTraining_500_systemError];
    }
}
exports.ChillnnTrainingError = ChillnnTrainingError;
const errorMessages = {
    chillnnTraining_400_badRequest: '不正なリクエストです',
    chillnnTraining_401_notSignIn: 'サインインしていません',
    chillnnTraining_404_resourceNotFound: 'リソースが見つかりません',
    chillnnTraining_500_systemError: 'システムエラーです',
    chillnnTraining_code_mismatch: '認証コードを間違えていませんか？',
    chillnnTraining_email_already_exists: '既に登録したメールアドレスではありませんか？',
    chillnnTraining_user_not_confirmed: 'コードによる認証はお済ませですか？',
};
