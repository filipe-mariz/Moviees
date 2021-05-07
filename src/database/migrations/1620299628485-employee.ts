import {MigrationInterface, QueryRunner} from "typeorm";
import { Table } from "typeorm/schema-builder/table/Table";

export class employee1620399628485 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'employee',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          unsigned: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },

        {
          name: 'name',
          type: 'varchar',
          isNullable: false
        },

        {
          name: 'level_authorization',
          type: 'integer',
          isNullable: false
        },

        {
          name: 'user_name',
          type: 'varchar',
          isNullable: false,
          isUnique: true
        },

        {
          name: 'password',
          type: 'varchar',
          isNullable: false
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employee');
  }

}
