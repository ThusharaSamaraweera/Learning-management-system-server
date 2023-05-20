import { MigrationInterface, QueryRunner } from "typeorm";

export class addFacultyToDepartment1684602588233 implements MigrationInterface {
    name = 'addFacultyToDepartment1684602588233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`department\` ADD \`faculty\` varchar(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`department\` DROP COLUMN \`faculty\``);
    }

}
