import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { USER_ROLES, USER_STATUS, USER_TITLE } from "../../../../constants/constants";

@Entity()
export class user extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({
    type: "varchar",
    length: 100,
  })
  name!: string;

  @Column({
    type: "varchar",
    length: 500,
  })
  description!: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  email!: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  password!: string;

  @Column({
    type: "varchar",
    length: 10,
  })
  status!: USER_STATUS;

  @Column({
    type: "varchar",
    length: 10,
  })
  role!: USER_ROLES;

  @Column({
    type: "varchar",
    length: 40,
  })
  title!: USER_TITLE;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt!: Date;
}
