"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["chillnnTraining_400_badRequest"] = "chillnnTraining_400_badRequest";
    ErrorCode["chillnnTraining_401_notSignIn"] = "chillnnTraining_401_notSignIn";
    ErrorCode["chillnnTraining_404_resourceNotFound"] = "chillnnTraining_404_resourceNotFound";
    ErrorCode["chillnnTraining_500_systemError"] = "chillnnTraining_500_systemError";
    ErrorCode["chillnnTraining_user_not_confirmed"] = "chillnnTraining_user_not_confirmed";
    ErrorCode["chillnnTraining_code_mismatch"] = "chillnnTraining_code_mismatch";
    ErrorCode["chillnnTraining_email_already_exists"] = "chillnnTraining_email_already_exists";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
var Role;
(function (Role) {
    Role["manager"] = "manager";
    Role["cleaner"] = "cleaner";
})(Role = exports.Role || (exports.Role = {}));
