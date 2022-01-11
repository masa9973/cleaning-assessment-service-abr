import { Role } from '../..';
import { RecordMast } from '../../type';
import { RecordModel } from './recordModel';
import { UserModel } from './userModel';

export class cleanerModel extends UserModel {
    // ============================================
    // getter / setter
    // ============================================
    /**
     * 清掃記録を作成する。registerはrecordModelで
     * userModelを参考
     */
    // if (role === Role.cleaner) {}
    // createNewRecord(): RecordMast {
    //     return this.modelFactory.RecordModel(RecordModel.getBlanc(this.userID, '', 0, 0))
    // }
}