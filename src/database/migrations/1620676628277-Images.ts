import movies from "src/routes/Movies.Routes";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Images1620676628277 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'Images',
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
          name: 'path',
          type: 'varchar',
        },

        {
          name: 'movies_id',
          type: 'integer'
        }        
      ],

      foreignKeys: [
        {
          name: 'images_movies',
          columnNames: ['movies_id'],
          referencedTableName: 'movies',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',

        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Images')
  }

}
