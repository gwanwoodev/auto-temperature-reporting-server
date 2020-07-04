import fetch from "isomorphic-unfetch";
import NodeCron from "node-cron";
import {LoginInterface} from "../controllers/main.interface";

export const randomNumber = () => {
    return Math.floor((Math.random()*6) + 3);
}

export const cusRequest = async ({URL, headers, body, method}: any) => {
    let response = await fetch(URL, {
        method,
        body,
        headers
    });

    return response.json();
}

export const removeSlave = (slaveList: Array<LoginInterface>) => {
    const task = NodeCron.schedule("0 21 * * *", () => {
        console.log("Running Remove Slave Schedule.");
        slaveList.filter(slave => {
            const today = getHugaDate();
            const slaveHudaDate = slave.hugaDate;

            return; //TODO;
        });
    }, {
        timezone: "Asia/Seoul"
    });

    task.start();
}

export const getHugaDate = () => {
    const date = new Date();
    const hugaMonth = date.getMonth() < 10 ? `0${date.getMonth()}`: date.getMonth();
    const hugaDay = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();

    return `${date.getFullYear()}-${hugaMonth}-${hugaDay}`;
}