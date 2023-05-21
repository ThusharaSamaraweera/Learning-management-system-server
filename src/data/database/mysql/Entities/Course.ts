import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, ManyToOne } from "typeorm";
import { ACADEMIC_YEAR, COURSE_LEVEL, FACULTY } from "../../../../modules";
import { Department } from "./Department";

@Entity()
export class course extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  name!: string;

  @Column({
    type: "varchar",
    length: 1000,
  })
  description!: string;

  @Column({
    type: "varchar",
    length: 10,
  })
  level!: COURSE_LEVEL;

  @Column({
    type: "varchar",
    length: 100,
  })
  academicYear!: ACADEMIC_YEAR;

  @Column({
    type: "varchar",
    length: 100,
  })
  faculty!: FACULTY;

  @ManyToOne(() => Department, (department) => department.id)
  department!: Department;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt!: Date;

  @Column({
    type: "varchar",
    length: 50,
  })
  createdBy!: string;
}
