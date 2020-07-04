import formEncode from "form-urlencoded";
import {cusRequest, randomNumber, removeSlave} from "../utils/custom";
import {LoginInterface} from "../controllers/main.interface";

let slaveList: Array<LoginInterface> = [];

class MainController {
    public LOGIN_URL: string = "https://coronacheck.net/api/mobileLogin.php";
    public REPORT_URL: string = "https://coronacheck.net/api/putToday.php";

    constructor() {
        /* Remove Slave at Everyday 12:00 AM */
        removeSlave(slaveList);
    }

    public async login({idVal, pwVal}): Promise<String> {
        /* Return Acess Token */
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-DEVICE-ID": "browser"            
        };

        let response = await cusRequest({
            URL: this.LOGIN_URL,
            method: "POST",
            body: formEncode({idVal, pwVal}),
            headers
        });

        if(response.token){
            slaveList.push({idVal, pwVal});
            console.log(slaveList);
        }

        return response;
        
    }

    public async report({token}): Promise<String> {
        /* Reporting temperature */
        const generatedTemp = `36.${randomNumber()}`;

        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-DEVICE-ID": "browser",
            "X-TOKEN": token
        };

        return await cusRequest({
            URL: this.REPORT_URL,
            method: "POST",
            body: formEncode({
                temperature: generatedTemp,
                symptoms: []
            }),
            headers
        });
    }
}

export default new MainController();