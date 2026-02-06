import { UserEntity } from "../entity/userEntity";

export interface IUserRepository{
    findByEmail(email : string) : Promise<UserEntity | null>
    create(user : UserEntity) : Promise<UserEntity>
}