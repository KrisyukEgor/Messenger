import { Status } from "../value-objects/status.value-object";

interface UserProps {
    id: string;
    name: string;
    email: string;
    password: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
}

export class User {
    private id: string;
    private name: string;
    private email: string;
    private password: string;
    private status: Status;
    private createdAt: Date;
    private updatedAt: Date;

    constructor(props: UserProps) {
        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.password = props.password;
        this.status = props.status;
        this.createdAt = new Date(props.createdAt); 
        this.updatedAt = new Date(props.updatedAt); 
    }

    getId() {return this.id}
    getName() {return this.name}
    getEmail() {return this.email}
    getPassword() {return this.password}
    getStatus() {return this.status}
    getCreatedAt() {return this.createdAt}
    getUpdatedAt() {return this.updatedAt}
}