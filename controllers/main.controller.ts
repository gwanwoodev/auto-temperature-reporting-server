import formEncode from "form-urlencoded";
import fetch from "isomorphic-unfetch";

interface LoginInterface {
    idVal: string;
    pwVal: string;
}

class MainController {
    public peoples: LoginInterface[];
    public LOGIN_URL: string = "https://coronacheck.net/api/mobileLogin.php";
    public REPORT_URL: string = "https://coronacheck.net/api/putToday.php";

    public async login(json): Promise<String> {
    
        let response = await fetch(this.LOGIN_URL, {
            method: "POST",
            body: formEncode(json),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-DEVICE-ID": "browser"
            },
        });
        console.log(response);

        let token = await response.json();
        console.log(token);
        return token;
    }

    public async report(...rest) {

    }
}

export default new MainController();