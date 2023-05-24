import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { USER_ROLES, USER_STATUS, USER_TITLE } from "../../../../constants/constants";
import { course } from "./Course";

@Entity()
export class user extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

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

  @ManyToMany(() => course, (course) => course.id)
  @JoinTable()
  courses!: course[];
}
