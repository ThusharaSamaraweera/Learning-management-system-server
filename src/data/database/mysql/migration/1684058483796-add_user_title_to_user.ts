import { MigrationInterface, QueryRunner } from "typeorm";

export class addUserTitleToUser1684058483796 implements MigrationInterface {
    name = 'addUserTitleToUser1684058483796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`title\` varchar(40) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`title\``);
    }

}
