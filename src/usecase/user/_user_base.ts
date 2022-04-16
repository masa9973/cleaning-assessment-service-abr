import { RepositoryContainer, ModelFactory, UserMast, UserMastRepositoryCacheAdaptor } from '../..';

export abstract class UserUsecase {
    public modelFactory: ModelFactory
    public repositoryContainer: RepositoryContainer
    constructor(
        repositoryContainer: RepositoryContainer, //
        modelFactory: ModelFactory
    ) {
        this.modelFactory = modelFactory
        this.repositoryContainer = repositoryContainer
    }
    // user登録、更新ができる
    public async registerUser(userMast: UserMast) {
        const user = this.modelFactory.UserModel(userMast)
        if (user.isRegisterble) {
            const now = new Date().getTime()
            if (user.isNew) {
                userMast.createdAt = now
                userMast.updatedAt = now
                await this.repositoryContainer.userMastRepository.addUserMast(userMast)
            } else {
                userMast.updatedAt = now
                await this.repositoryContainer.userMastRepository.updateUserMast(userMast)
            }
            user.isNew = false
        }
    }
}