"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreUsecase = void 0;
const entities_1 = require("../../entities");
const scoreModel_1 = require("../../entities/models/modules/scoreModel");
const util_1 = require("../../util");
class ScoreUsecase {
    constructor(repositoryContainer, modelFactory, recordModel) {
        this.repositoryContainer = repositoryContainer;
        this.modelFactory = modelFactory;
        this.recordModel = recordModel;
    }
    /* 新しいスコアを作成 */
    async createNewScore() {
        const me = await this.repositoryContainer.userMastRepository.fetchMyUserMast();
        if (!me) {
            throw new util_1.ChillnnTrainingError(entities_1.ErrorCode.chillnnTraining_404_resourceNotFound);
        }
        const userID = this.modelFactory.UserModel(me).userID;
        // this.recordModel.switchIfScored();
        return this.modelFactory.ScoreModel(scoreModel_1.ScoreModel.getBlanc(this.recordModel.recordID, userID, 0, '', '', this.recordModel.cleaningRoomID), {
            isNew: true,
        });
    }
}
exports.ScoreUsecase = ScoreUsecase;
