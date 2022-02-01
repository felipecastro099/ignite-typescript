import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterCarsTable1643757109985 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('cars', 'available');
        await queryRunner.addColumn(
            'cars',
            new TableColumn({
                name: 'avaliable',
                type: 'boolean',
                default: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('cars', 'avaliable');
        await queryRunner.addColumn(
            'cars',
            new TableColumn({
                name: 'available',
                type: 'boolean',
                default: true,
            })
        );
    }
}
