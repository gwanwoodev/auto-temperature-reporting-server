export interface LoginInterface {
    idVal: string;
    pwVal: string;
    hugaDate?: Date;
    schedule?: boolean;
}

export interface LoginResInterface {
    status: string;
    token: string;
    deviceId: string;
}