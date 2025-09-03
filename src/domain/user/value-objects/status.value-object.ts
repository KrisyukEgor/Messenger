import { StatusEnum } from "../enums/status.enum";

export class Status {
    private _status: StatusEnum;

    private constructor(status: StatusEnum) {
        this._status = status;
    }

    static online(): Status {
        return new Status(StatusEnum.online)
    }

    static offline(): Status {
        return new Status(StatusEnum.offline);
    }

    static typing(): Status {
        return new Status(StatusEnum.typing);
    }

    toString(): string {
        return this._status;
    }

    static fromValue(value: string): Status | undefined {
        if(Object.values(StatusEnum).includes(value as StatusEnum)) {
            return new Status(value as StatusEnum);
        }
    }
}