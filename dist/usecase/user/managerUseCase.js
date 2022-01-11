"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerUsecase = void 0;
class ManagerUsecase {
    // managerModelとrecordModel
    constructor(repositoryContainer, modelFactory, recordModel) {
        this.repositoryContainer = repositoryContainer;
        this.modelFactory = modelFactory;
        this.recordModel = recordModel;
    }
}
exports.ManagerUsecase = ManagerUsecase;
