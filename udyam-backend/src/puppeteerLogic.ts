import puppeteer from "puppeteer"

const openSessions: any = {}

export const addAadharDetails = async(aadharNo: string, name: string) => {
    const browser = await puppeteer.launch({headless: false, devtools: true});
    const page = await browser.newPage();

    openSessions[name] = {browser, page};
    
    await page.goto('https://udyamregistration.gov.in/UdyamRegistration.aspx');
    

    await page.type('input[name="ctl00$ContentPlaceHolder1$txtadharno"]', `${aadharNo}`); 

    await page.type('input[name="ctl00$ContentPlaceHolder1$txtownername"]', name);



    await page.click('input[value="Validate & Generate OTP"]')

    const message = await page.$eval("#ctl00_ContentPlaceHolder1_lblmsg", el => el.textContent.trim());
    
    try {
        await page.waitForFunction(
            () => {
                const el = document.querySelector('#ctl00_ContentPlaceHolder1_lblmsg');
                return el && el.textContent.trim().length > 0;
            },
            { timeout: 4000 }
        );

        const errorText = await page.$eval('#ctl00_ContentPlaceHolder1_lblmsg', el => el.textContent.trim());

        if (errorText.includes('Your Aadhaar has not been validated')) {
            return {
                success: false,
                message: "Invalid details",
            }
        }
    } catch (e) {
        return {
            success: true,
            message: "Provide OPT",
        }
    } 
} 

export const validateOTPAadhar = async(otp: number, name: string) => {

    if(!openSessions[name]){
        return {
            message: "Sorry session expired",
            success: false
        }
    }
    const {browser, page} = openSessions[name] ;
    await page.click('input[name="ctl00$ContentPlaceHolder1$btnValidate"]');
    await page.type('input[name="ctl00$ContentPlaceHolder1$txtOtp1"]', `${otp}`);

    await page.click('input[name="ctl00$ContentPlaceHolder1$btnValidate"]');


    try {
        await page.waitForFunction(
            () => {
                const el = document.querySelector('#ctl00_ContentPlaceHolder1_lblmsg');
                return el && el.textContent.trim().length > 0;
            },
            { timeout: 4000 }
        );

        const validMsg = await page.$eval('#ctl00_ContentPlaceHolder1_lblmsg', (el: Element) => el.textContent.trim());
        if (validMsg.includes('successfully')) {
            return {
                success: true,
                message: "continue with the process",
            }
        }
    } catch (e) {
        return {
            success: false,
            message: "Invalid Otp",
        }
    } 
}



export const addPanDetails = async (orgType: string, pan: string, name: string, dob: string, userName: string) => {

    const { browser, page } = openSessions[userName];

    await page.select('select[name="ctl00$ContentPlaceHolder1$ddlTypeofOrg"]', orgType);
    await page.waitForNetworkIdle({ idleTime: 500 });
    await page.type('input[name="ctl00$ContentPlaceHolder1$txtPan"]', pan);
    await page.type('input[name="ctl00$ContentPlaceHolder1$txtPanName"]', name);
    await page.type('input[name="ctl00$ContentPlaceHolder1$txtdob"]', dob);
    await page.click('input[name="ctl00$ContentPlaceHolder1$chkDecarationP"]');
    await page.click('input[name="ctl00$ContentPlaceHolder1$btnValidatePan"]');
    await page.waitForNetworkIdle({idleTime: 2000});
    const msg = await page.$eval('#ctl00_ContentPlaceHolder1_lblPanError', (el: Element) => el.textContent.trim());
    if(msg.includes('Your PAN has been successfully verified')){
        return {
            message: "Registration Done",
            success: true
        }
    }
    
    return {
        message: "some issue occured please try again",
        success: false 
    };
}