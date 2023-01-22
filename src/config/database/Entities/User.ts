import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm'
import {ROLE, STATUS} from '../../../modules';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({
        type: 'varchar',
        length: 100
    })
    firstName!: string

    @Column({
        type: 'varchar',
        length: 100
    })
    lastName!: string

    @Column({
        type: 'varchar',
        length: 100
    })
    contactNumber!: string

    @Column({
        type: 'varchar',
        length: 100
    })
    email!: string

    @Column({
        type: 'varchar',
        length: 100
    })
    password!: string

    @Column({
        type: 'varchar',
        length: 10
    })
    status!: STATUS

    @Column({
        type: 'varchar',
        length: 10
    })
    role!: ROLE
}