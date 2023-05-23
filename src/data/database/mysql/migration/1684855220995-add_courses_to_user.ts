import { MigrationInterface, QueryRunner } from "typeorm";

export class addCoursesToUser1684855220995 implements MigrationInterface {
    name = 'addCoursesToUser1684855220995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_courses_course\` (\`userId\` varchar(36) NOT NULL, \`courseId\` varchar(36) NOT NULL, INDEX \`IDX_e99d8f99eff1a45a772b11060e\` (\`userId\`), INDEX \`IDX_d67262674f71493825eb35e2e2\` (\`courseId\`), PRIMARY KEY (\`userId\`, \`courseId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_courses_course\` ADD CONSTRAINT \`FK_e99d8f99eff1a45a772b11060e5\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_courses_course\` ADD CONSTRAINT \`FK_d67262674f71493825eb35e2e2c\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_courses_course\` DROP FOREIGN KEY \`FK_d67262674f71493825eb35e2e2c\``);
        await queryRunner.query(`ALTER TABLE \`user_courses_course\` DROP FOREIGN KEY \`FK_e99d8f99eff1a45a772b11060e5\``);
        await queryRunner.query(`DROP INDEX \`IDX_d67262674f71493825eb35e2e2\` ON \`user_courses_course\``);
        await queryRunner.query(`DROP INDEX \`IDX_e99d8f99eff1a45a772b11060e\` ON \`user_courses_course\``);
        await queryRunner.query(`DROP TABLE \`user_courses_course\``);
    }

}
