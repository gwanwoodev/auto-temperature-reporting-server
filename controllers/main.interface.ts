export interface LoginInterface {
    idVal: string;
    pwVal: string;
    hugaDate?: Date;
}

export interface LoginResInterface {
    status: string;
    token: string;
    deviceId: string;
}