import {MigrationInterface, QueryRunner} from "typeorm";
import { Table } from "typeorm/schema-builder/table/Table";
import { date } from "yup/lib/locale";

export class movies1620398998140 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'movies',
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
          name: 'time',
          type: 'varchar',
          isNullable: false
        },

        {
          name: 'price',
          type: 'float',
          isNullable: false
        },

        {
          name: 'description',
          type: 'varchar',
          isNullable: false
        },

        {
          name: 'data_born',
          type: 'date',          
        },

        {
          name: 'data_end',
          type: 'date'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movies')
  }
}
