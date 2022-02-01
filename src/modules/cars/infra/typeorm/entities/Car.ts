import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Category } from './Category';

@Entity('cars')
class Car {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    avaliable: boolean;

    @Column()
    brand: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @Column()
    category_id: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
            this.avaliable = true;
        }
    }
}

export { Car };
