import formEncode from "form-urlencoded";
import NodeCron from "node-cron";
import { cusRequest, randomNumber } from "../utils/custom";
import {
  LoginInterface,
  LoginResInterface,
} from "../controllers/main.interface";

class MainController {
  public LOGIN_URL: string = "https://coronacheck.net/api/mobileLogin.php";
  public REPORT_URL: string = "https://coronacheck.net/api/putToday.php";

  constructor() {
    /* Remove Slave at Everyday 12:00 AM */
    var slaveList: Array<LoginInterface>;
    globalThis.slaveList = [];
    this.removeSlave();
    this.reportSlave();
  }

  public async login({ idVal, pwVal, hugaDate, schedule }): Promise<String> {
    /* Return Acess Token */
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-DEVICE-ID": "browser",
    };

    let response = await cusRequest({
      URL: this.LOGIN_URL,
      method: "POST",
      body: formEncode({ idVal, pwVal }),
      headers,
    });

    if (response.token && schedule) {
      let slaveListString = JSON.stringify(globalThis.slaveList);
      let newMember = { idVal, pwVal, hugaDate };

      if (slaveListString.includes(JSON.stringify(newMember))) {
        return;
      }

      globalThis.slaveList.push(newMember);
    }

    return response.token;
  }

  public async report({ token }): Promise<String> {
    /* Reporting temperature */
    const generatedTemp = `36.${randomNumber()}`;

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-DEVICE-ID": "browser",
      "X-TOKEN": token,
    };

    return await cusRequest({
      URL: this.REPORT_URL,
      method: "POST",
      body: formEncode({
        temperature: generatedTemp,
        symptoms: [],
      }),
      headers,
    });
  }

  public removeSlave = () => {
    /* Remove Slave at 21:00 */
    const task = NodeCron.schedule(
      "0 21 * * *",
      () => {
        console.log("Running Remove Slave Schedule.");
        globalThis.slaveList = globalThis.slaveList.filter((slave) => {
          const today = new Date();
          return today < new Date(slave.hugaDate); //TODO;
        });
      },
      {
        timezone: "Asia/Seoul",
      }
    );

    task.start();
  };

  public reportSlave = () => {
    /* Report Slave at 07:00 & 19:00 */
    /* 0 7,19 1-31 * * */
    const reportTask = NodeCron.schedule(
      "0 7,19 1-31 * *",
      () => {
        console.log("Execute Report at 07:00 & 19:00");
        let tempSlaveList = [];
        if (globalThis.slaveList) {
          tempSlaveList = globalThis.slaveList.filter((slave) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const slaveDate = new Date(slave.hugaDate);
            slaveDate.setDate(slaveDate.getDate() - 2);
            slaveDate.setHours(0, 0, 0, 0);
            const endDate = new Date(slave.hugaDate);
            endDate.setHours(0, 0, 0, 0);
            return today >= slaveDate && endDate >= today;
          });

          tempSlaveList.forEach(async (slave) => {
            let token = await this.login({ ...slave, schedule: false });
            let response = await this.report({ token });
            console.log(response);
          });
        }
      },
      {
        timezone: "Asia/Seoul",
      }
    );

    reportTask.start();
  };
}

export default new MainController();
