import { Scalars, UserMast } from '../../type'

export interface IUserMastRepository {
    addUserMast(input: UserMast): Promise<UserMast>
    updateUserMast(input: UserMast): Promise<UserMast>
    fetchMyUserMast(): Promise<UserMast | null>
    fetchUserMastByUserID(userID: Scalars['ID']): Promise<UserMast | null>
    fetchAllUserByHotelID(userHotelID: Scalars['ID']): Promise<UserMast[]>
}