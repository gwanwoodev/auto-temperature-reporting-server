import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Routes } from "./routes/router";

class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    public SERVER_PORT = process.env.PORT;
    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(cors());
        this.routePrv.routes(this.app);
        this.app.listen(this.SERVER_PORT, () => console.log(`listen port ${this.SERVER_PORT}`));
    }
}

export default new App();