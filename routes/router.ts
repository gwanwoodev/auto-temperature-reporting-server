import {Request, Response} from "express";
import MainController from "../controllers/main.controller";
export class Routes {
    public routes(app): void {
        app.route("/api/report").post(async (req: Request, res: Response) => {
            let token = await MainController.login(req.body);
            let result = await MainController.report({...token, temperature: "37.5", symptoms: []});
            res.json(result);
        })
    }
}