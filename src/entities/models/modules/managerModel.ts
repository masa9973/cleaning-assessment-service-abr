import { RecordModel } from './recordModel';
import { ScoreModel } from './scoreModel';
import { UserModel } from './userModel';

export class ManagerModel extends UserModel {
    // ============================================
    // getter / setter
    // ============================================
    
    /* scoreを作成
    レコードIDがない */
    // createNewScore(): ScoreModel {
    //     return this.modelFactory.ScoreModel(ScoreModel.getBlanc)
    // }
    
    /**
     * 清掃記録評価を登録、引数にRecordModelを持つ関数を実装？
     * プロフの更新がしやすかったのは同じモデル内で完結していたから
     */
    // addEvaluationUserID(recordModel: RecordModel) {
    //     recordModel.evaluateUserID = this.userID
    // }


    //  async evaluateRecord() {
    //     const now = new Date().getTime();
    //     await this.repositoryContainer.recordMastRepository.updateRecordMast(this.mast);
    // }

    // createNewEvaluation() {
    //     return this.modelFactory.RecordModel(RecordModel.getEvaluateBlanc('', this.userID, '', ))
    // }

    // /* userModelを参考 */
    // createNewPost(): PostModel {
    //     return this.modelFactory.PostModel(PostModel.getBlanc(this.userID, this.repositoryContainer.s3Repository.getSampleImage()), {
    //         isNew: true,
    //     });
    // }

    /**
     * ユーザー情報を新規登録、または更新する
     */
    // async register() {
    //     if (this.isRegisterble) {
    //         const now = new Date().getTime();
    //         if (this.isNew) {
    //             this.mast.createdAt = now;
    //             this.mast.updatedAt = now;
    //             await this.repositoryContainer.userMastRepository.addUserMast(this.mast);
    //         } else {
    //             this.mast.updatedAt = now;
    //             await this.repositoryContainer.userMastRepository.updateUserMast(this.mast);
    //         }
    //         this.isNew = false;
    //     }
    // }
}