import formEncode from "form-urlencoded";
import {cusRequest} from "../utils/custom";
interface LoginInterface {
    idVal: string;
    pwVal: string;
}

class MainController {
    public peoples: LoginInterface[];
    public LOGIN_URL: string = "https://coronacheck.net/api/mobileLogin.php";
    public REPORT_URL: string = "https://coronacheck.net/api/putToday.php";

    public async login({idVal, pwVal}): Promise<String> {
        /* Return Acess Token */
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-DEVICE-ID": "browser"            
        };

        return await cusRequest({
            URL: this.LOGIN_URL,
            method: "POST",
            body: formEncode({idVal, pwVal}),
            headers
        });
    }

    public async report(...rest) {
        // Request
        /*
        01. get Token
        02. Request
        03. Random Minutes
        04. setInterval
        */

        let token = rest[0].token;
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-DEVICE-ID": "browser",
            "X-TOKEN": token
        };

        let info = {
            temperature: rest[0].temperature,
            symptoms: []
        }

        return await cusRequest({
            URL: this.REPORT_URL,
            method: "POST",
            body: formEncode(info),
            headers
        });
    }
}

export default new MainController();