import { BaseEntity } from "@/base";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("users_pkey", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", {
    name: "username",
    nullable: false,
    unique: true,
  })
  username: string;

  @Column("character varying", { name: "password", nullable: false })
  password: string;

  @Column("character varying", { name: "role", nullable: false })
  role: string;
}
