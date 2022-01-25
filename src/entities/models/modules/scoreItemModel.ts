import { Scalars, ScoreItemMast } from '../..';
import { generateUUID } from '../../..';
import { BaseModel } from './_baseModel';

export class ScoreItemModel extends BaseModel<ScoreItemMast> {
    static getBlanc(scoreItemName: Scalars['String'], scoreItemHotelID: Scalars['ID']): ScoreItemMast {
        return {
            scoreItemID: generateUUID(),
            scoreItemName,
            createdAt: new Date().getTime(),
            scoreItemHotelID,
        }
    }
    // ============================================
    // getter / setter
    // ============================================
    get scoreItemID() {
        return this.mast.scoreItemID
    }
    get createdAt() {
        return this.mast.createdAt
    }
    get scoreItemHotelID() {
        return this.mast.scoreItemHotelID
    }
    set scoreItemHotelID(input: string) {
        this.mast.scoreItemHotelID = input
    }
    get scoreItemName() {
        return this.mast.scoreItemName
    }
    set scoreItemName(input: string) {
        this.mast.scoreItemName = input
    }

    async register() {
        this.mast.createdAt = new Date().getTime()
        this.mast = await this.repositoryContainer.scoreItemMastRepository.addScoreItem(this.mast)
    }
}