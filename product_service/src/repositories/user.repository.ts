import { User } from "@/entities/user";
import { EntityRepository } from "typeorm";
import BaseRepository from "@/base/base.repository";

@EntityRepository(User)
class UserRepository extends BaseRepository<User> {
  async getAll() {
    return this.find();
  }
}

export default UserRepository;
