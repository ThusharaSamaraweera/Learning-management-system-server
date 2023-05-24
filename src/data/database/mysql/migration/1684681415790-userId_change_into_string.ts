import { MigrationInterface, QueryRunner } from "typeorm";

export class userIdChangeIntoString1684681415790 implements MigrationInterface {
    name = 'userIdChangeIntoString1684681415790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` MODIFY COLUMN \`id\` varchar(36)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` MODIFY COLUMN \`id\` int`);
    }

}
