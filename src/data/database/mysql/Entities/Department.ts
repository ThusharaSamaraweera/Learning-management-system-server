import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({
    type: "varchar",
    length: 100,
  })
  name!: string;
}
