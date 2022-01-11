import { ModelFactory } from '..';
import { RepositoryContainer } from '../../repositories';
export declare type ModelOption = {
    isNew: boolean;
};
export declare abstract class BaseModel<ResourceMast> {
    protected mast: ResourceMast;
    protected repositoryContainer: RepositoryContainer;
    protected modelFactory: ModelFactory;
    private option;
    static baseModelOption(): ModelOption;
    constructor(mast: ResourceMast, repositoryContainer: RepositoryContainer, modelFactory: ModelFactory, option: ModelOption);
    get isNew(): boolean;
    set isNew(input: boolean);
}
