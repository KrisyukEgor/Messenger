export abstract class AbstractPasswordHasher {
    abstract hash(password: string): Promise<string>;
    abstract compare(plainPassword, hashedPassword): Promise<boolean>;
}