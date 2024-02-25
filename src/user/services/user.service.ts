import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { UpdateUserDTO, UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";

export class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  async findAllUser(): Promise<UserEntity[]> {
    return (await this.execRepository).find();
  }

  // async findUserById(id: string): Promise<UserEntity | undefined> {
  //   return (await this.execRepository).findOne({ id });
  // }
  async findUserById(id: string): Promise<UserEntity | undefined> {
    const user: UserEntity | null = await (await this.execRepository)
        .createQueryBuilder('user')
        .where({ id })
        .getOne();
    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    return user;
}




  async createUser(body: UserDTO): Promise<UserEntity> {
    return (await this.execRepository).save(body);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }

  async updateUser(id: string, infoUpdate: UpdateUserDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }
}