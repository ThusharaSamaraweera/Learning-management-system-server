import { MigrationInterface, QueryRunner } from "typeorm";

export class createCourseTable1684601530357 implements MigrationInterface {
    name = 'createCourseTable1684601530357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`course\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(50) NOT NULL, \`description\` varchar(1000) NOT NULL, \`level\` varchar(10) NOT NULL, \`academicYear\` varchar(100) NOT NULL, \`faculty\` varchar(100) NOT NULL, \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`departmentId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`course\` ADD CONSTRAINT \`FK_62bd85cf9a50b5dff651935e028\` FOREIGN KEY (\`departmentId\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`course\` DROP FOREIGN KEY \`FK_62bd85cf9a50b5dff651935e028\``);
        await queryRunner.query(`DROP TABLE \`course\``);
    }

}
