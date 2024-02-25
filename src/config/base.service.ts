import { EntityTarget, Repository } from "typeorm";
import { ConfigServer } from "./config";
import { BaseEntity } from "./base.entity";

export class BaseService<T extends BaseEntity> extends ConfigServer {
    public execRepository: Promise<Repository<T>>;

    constructor(private getEntity: EntityTarget<T>) {
        super();
        this.execRepository = this.initRepository(getEntity);
    }

    async initRepository(entity: EntityTarget<T>): Promise<Repository<T>> {
        const getConn = await this.dbConnect();
        return getConn.getRepository(entity);
    }
}