import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { USER_ROLES, USER_STATUS } from "../../../../constants/constants";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({
    type: "varchar",
    length: 100,
  })
  firstName!: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  lastName!: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  contactNumber!: string;

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
