import {Request, Response} from "express";
import MainController from "../controllers/main.controller";
export class Routes {
    public routes(app): void {
        app.route("/api/report").post(async (req: Request, res: Response) => {
            let token:any = await MainController.login({idVal:req.body.idVal, pwVal: req.body.pwVal});
            let result = await MainController.report(token);
            res.json(result);
        })
    }
}