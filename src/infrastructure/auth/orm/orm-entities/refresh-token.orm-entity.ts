import { Column, CreateDateColumn, Entity, ForeignKey, PrimaryColumn } from "typeorm";

@Entity({name: "refresh_token"})
export class RefreshTokenOrmEntity {
    
    @PrimaryColumn('uuid')
    id: string;
    
    @Column({
        type: 'uuid',
        name: 'user_id'
    })
    userId: string;
    
    @Column({
        type: 'varchar',
        length: 128,
        unique: true,
    })
    token: string;


    @Column({
        type: "timestamptz",
        name: 'expires_at'
    })
    expiresAt: Date;

    @CreateDateColumn({
        type: 'timestamptz',
        name: 'created_at'
    })
    createdAt: Date;

    @Column({
        type: 'boolean',
        name: 'is_revoked',
        default: false,
    })
    isRevoked: boolean;

    @Column({
        type: 'timestamptz',
        name: 'revoked_at',
        nullable: true
    })
    revokedAt?: Date;
}