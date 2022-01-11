"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelFactory = void 0;
const userModel_1 = require("./modules/userModel");
const recordModel_1 = require("./modules/recordModel");
const _baseModel_1 = require("./modules/_baseModel");
const managerModel_1 = require("./modules/managerModel");
const scoreModel_1 = require("./modules/scoreModel");
__exportStar(require("./modules/userModel"), exports);
__exportStar(require("./modules/recordModel"), exports);
__exportStar(require("./modules/scoreModel"), exports);
class ModelFactory {
    constructor(repositoryContainer) {
        this.repositoryContainer = repositoryContainer;
    }
    UserModel(mast, option) {
        return new userModel_1.UserModel(mast, this.repositoryContainer, this, option || _baseModel_1.BaseModel.baseModelOption());
    }
    ManagerModel(mast, option) {
        return new managerModel_1.ManagerModel(mast, this.repositoryContainer, this, option || _baseModel_1.BaseModel.baseModelOption());
    }
    CleanerModel(mast, option) {
        return new userModel_1.UserModel(mast, this.repositoryContainer, this, option || _baseModel_1.BaseModel.baseModelOption());
    }
    RecordModel(mast, option) {
        return new recordModel_1.RecordModel(mast, this.repositoryContainer, this, option || _baseModel_1.BaseModel.baseModelOption());
    }
    ScoreModel(mast, option) {
        return new scoreModel_1.ScoreModel(mast, this.repositoryContainer, this, option || _baseModel_1.BaseModel.baseModelOption());
    }
}
exports.ModelFactory = ModelFactory;
