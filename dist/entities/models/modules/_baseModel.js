"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
class BaseModel {
    constructor(mast, repositoryContainer, modelFactory, option) {
        this.mast = mast;
        this.repositoryContainer = repositoryContainer;
        this.modelFactory = modelFactory;
        this.option = option;
    }
    static baseModelOption() {
        return {
            isNew: false,
        };
    }
    get isNew() {
        return this.option.isNew;
    }
    set isNew(input) {
        this.option.isNew = input;
    }
}
exports.BaseModel = BaseModel;
