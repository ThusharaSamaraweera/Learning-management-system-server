import { MigrationInterface, QueryRunner } from "typeorm";

export class addCreatedByToCourse1684661170447 implements MigrationInterface {
    name = 'addCreatedByToCourse1684661170447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`course\` ADD \`createdBy\` varchar(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`course\` DROP COLUMN \`createdBy\``);
    }

}
