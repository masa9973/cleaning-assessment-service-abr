"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const _baseModel_1 = require("./_baseModel");
class UserModel extends _baseModel_1.BaseModel {
    // ============================================
    // getters
    // ============================================
    get userID() {
        return this.mast.userID;
    }
    get createdAt() {
        return this.mast.createdAt;
    }
    get updatedAt() {
        return this.mast.updatedAt;
    }
    get userIcon() {
        if (this.mast.userIcon) {
            return this.mast.userIcon.url;
        }
        else {
            return this.repositoryContainer.s3Repository.getSampleImage().url;
        }
    }
    get hotelID() {
        return this.mast.hotelID;
    }
    // ============================================
    // getter / setter
    // ============================================
    get name() {
        return this.mast.name;
    }
    set name(input) {
        this.mast.name = input;
    }
    get email() {
        return this.mast.email;
    }
    set email(input) {
        this.mast.email = input;
    }
    get role() {
        return this.mast.role;
    }
    set role(input) {
        this.mast.role = input;
    }
    // ============================================
    // validation
    // ============================================
    get isRegisterble() {
        return true;
    }
    // ============================================
    // functions
    // ============================================
    /**
     * アイコン画像をセットする
     * @param file
     */
    async setIcon(file) {
        const path = `user/${this.userID}/iconImage/${new Date().getTime()}`;
        this.mast.userIcon = await this.repositoryContainer.s3Repository.addFile(path, file);
    }
    /**
     * ユーザー情報を新規登録、または更新する
     */
    async register() {
        if (this.isRegisterble) {
            const now = new Date().getTime();
            if (this.isNew) {
                this.mast.createdAt = now;
                this.mast.updatedAt = now;
                await this.repositoryContainer.userMastRepository.addUserMast(this.mast);
            }
            else {
                this.mast.updatedAt = now;
                await this.repositoryContainer.userMastRepository.updateUserMast(this.mast);
            }
            this.isNew = false;
        }
    }
}
exports.UserModel = UserModel;
