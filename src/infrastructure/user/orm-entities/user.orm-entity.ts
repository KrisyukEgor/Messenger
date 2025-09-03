import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class UserOrmEntity {
    @PrimaryColumn('uuid', {unique: true, nullable: false})
    id: string;

    @Column({nullable: false, length: 100})
    name: string;

    @Column({nullable: false, unique: true, length: 255})
    email: string;

    @Column({nullable: false, length: 255})
    password: string;

    @Column({nullable: false, type: 'varchar'})
    status: string;

    @CreateDateColumn({type: 'timestamptz', nullable: false, name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamptz', nullable: false, name: 'updated_at'})
    updatedAt: Date;
}