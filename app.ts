import express from "express";
import bodyParser from "body-parser";
import {Routes} from "./routes/router";

class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    public SERVER_PORT: Number = 3000;
    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.routePrv.routes(this.app);
        this.app.listen(this.SERVER_PORT, () => console.log(`listen port ${this.SERVER_PORT}`));
    }
}

export default new App();