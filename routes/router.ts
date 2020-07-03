import {Request, Response} from "express";
import MainController from "../controllers/main.controller";
export class Routes {
    public routes(app): void {
        app.route("/api/report").post(async (req: Request, res: Response) => {
            const testData:any = {
                idVal: 'yeonkevin@daum.net',
                pwVal: '2cf05a453e862bf9a9302124325799df642e2309896245064de46687d14b06c43fb8df603e81df7085cc6ce3629bb987cf67d3d863150ddec0146b064e9e8f61'
            }
            let token = await MainController.login(testData);
            res.json(token);
        })
    }
}