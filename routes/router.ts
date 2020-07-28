import { Request, Response } from "express";
import MainController from "../controllers/main.controller";
export class Routes {
  public routes(app): void {
    app.route("/api/report").post(async (req: Request, res: Response) => {
      let token: any = await MainController.login({
        idVal: req.body.idVal,
        pwVal: req.body.pwVal,
        hugaDate: req.body.hugaDate,
        schedule: true,
      });
      // let result = await MainController.report(token);
      res.json({ token });
    });

    app.route("/api/test").get((req: Request, res: Response) => {
      res.json(globalThis.slaveList);
    });

    app.route("/api/queue").get((req: Request, res: Response) => {
      let tempSlaveList = [];
      if (globalThis.slaveList) {
        tempSlaveList = globalThis.slaveList.filter((slave) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const slaveDate = new Date(slave.hugaDate);
          slaveDate.setDate(slaveDate.getDate() - 3);
          slaveDate.setHours(0, 0, 0, 0);
          const endDate = new Date(slave.hugaDate);
          endDate.setHours(0, 0, 0, 0);
          return today >= slaveDate && endDate >= today;
        });
        res.json(tempSlaveList);
      }
    });
  }
}
