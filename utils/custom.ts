import fetch from "isomorphic-unfetch";
import NodeCron from "node-cron";
import { LoginInterface } from "../controllers/main.interface";

export const randomNumber = () => {
  return Math.floor(Math.random() * 6 + 3);
};

export const cusRequest = async ({ URL, headers, body, method }: any) => {
  let response = await fetch(URL, {
    method,
    body,
    headers,
  });

  return response.json();
};

export const removeSlave = () => {
  const task = NodeCron.schedule(
    "* * * * *",
    () => {
      console.log("Running Remove Slave Schedule.");
      console.log("----before----");
      console.log(globalThis.slaveList);
      globalThis.slaveList = globalThis.slaveList.filter((slave) => {
        const today = new Date();
        return today < new Date(slave.hugaDate); //TODO;
      });

      console.log("----after----");
      console.log(globalThis.slaveList);
    },
    {
      timezone: "Asia/Seoul",
    }
  );

  task.start();
};
