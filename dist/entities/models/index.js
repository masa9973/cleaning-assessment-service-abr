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
const scoreModel_1 = require("./modules/scoreModel");
const RoomModel_1 = require("./modules/RoomModel");
const hotelModel_1 = require("./modules/hotelModel");
const scoreItemModel_1 = require("./modules/scoreItemModel");
__exportStar(require("./modules/userModel"), exports);
__exportStar(require("./modules/recordModel"), exports);
__exportStar(require("./modules/scoreModel"), exports);
__exportStar(require("./modules/hotelModel"), exports);
__exportStar(require("./modules/RoomModel"), exports);
__exportStar(require("./modules/scoreItemModel"), exports);
class ModelFactory {
    constructor(repositoryContainer) {
        this.repositoryContainer = repositoryContainer;
    }
    UserModel(mast, option) {
        return new userModel_1.UserModel(mast, this.repositoryContainer, this, option || _baseModel_1.BaseModel.baseModelOption());
    }
    RecordModel(mast, option) {
        return new recordModel_1.RecordModel(mast, this.repositoryContainer, this, option || _baseModel_1.BaseModel.baseModelOption());
    }
    ScoreModel(mast, option) {
        return new scoreModel_1.ScoreModel(mast, this.repositoryContainer, this, option || _baseModel_1.BaseModel.baseModelOption());
    }
    RoomModel(mast, option) {
        return new RoomModel_1.RoomModel(mast, this.repositoryContainer, this, option || _baseModel_1.BaseModel.baseModelOption());
    }
    HotelModel(mast, option) {
        return new hotelModel_1.HotelModel(mast, this.repositoryContainer, this, option || _baseModel_1.BaseModel.baseModelOption());
    }
    ScoreItemModel(mast, option) {
        return new scoreItemModel_1.ScoreItemModel(mast, this.repositoryContainer, this, option || _baseModel_1.BaseModel.baseModelOption());
    }
}
exports.ModelFactory = ModelFactory;
