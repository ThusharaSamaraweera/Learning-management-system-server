import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { FACULTY } from "../../../../modules";

@Entity()
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({
    type: "varchar",
    length: 100,
  })
  name!: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  faculty!: FACULTY;
}
