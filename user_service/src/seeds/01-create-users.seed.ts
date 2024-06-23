import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { User } from "@/entities/user";

export default class CreateCategory implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ username: "admin", password: "admin", role: "ADMIN" }])
      .updateEntity(false)
      .execute();
  }
}
