export interface RefreshTokenProps {
    id: string;
    token: string;
    userId: string;
    expiresAt: Date;
    createdAt: Date;
    isRevoked: boolean;
    revokedAt?: Date;
}

export class RefreshTokenEntity {
    private _id: string;
    private _token: string;
    private _userId: string;

    private _expiresAt: Date;
    private _createdAt: Date;
    private _isRevoked: boolean;
    private _revokedAt?: Date;

    constructor(props: RefreshTokenProps) {
        this._id = props.id;
        this._token = props.token;
        this._userId = props.userId;
        this._expiresAt = props.expiresAt;
        this._createdAt = props.createdAt;
        this._isRevoked = props.isRevoked;
        this._revokedAt = props.revokedAt;
    }

    get id(): string { return this._id; }
    get token(): string { return this._token; }
    get userId(): string { return this._userId; }
    get expiresAt(): Date { return this._expiresAt; }
    get createdAt(): Date { return this._createdAt; }
    get isRevoked(): boolean { return this._isRevoked; }
    get revokedAt(): Date | undefined {return this._revokedAt;}

    isExpired(): boolean {
        return this._expiresAt < new Date();
    }

    revoke(): void {
        this._isRevoked = true;
        this._revokedAt = new Date();
    }
}