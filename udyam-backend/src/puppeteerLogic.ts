import puppeteer from "puppeteer"

const openSessions: any = {}

export const addAadharDetails = async(aadharNo: number, name: string) => {
    const browser = await puppeteer.launch({headless: false, devtools: true});
    const page = await browser.newPage();

    openSessions[name] = {browser, page};
    
    await page.goto('https://udyamregistration.gov.in/UdyamRegistration.aspx');
    
    page.setViewport({width: 1080, height: 1024});

    await page.type('input[name="ctl00$ContentPlaceHolder1$txtadharno"]', `${aadharNo}`); 

    // Type into password field if needed
    await page.type('input[name="ctl00$ContentPlaceHolder1$txtownername"]', name);



    await page.click('input[value="Validate & Generate OTP"]')

    const message = await page.$eval("#ctl00_ContentPlaceHolder1_lblmsg", el => el.textContent.trim());
    console.log(message);
    
    try {
        await page.waitForFunction(
            () => {
                const el = document.querySelector('#ctl00_ContentPlaceHolder1_lblmsg');
                return el && el.textContent.trim().length > 0;
            },
            { timeout: 4000 }
        );

        const errorText = await page.$eval('#ctl00_ContentPlaceHolder1_lblmsg', el => el.textContent.trim());
        console.log("Validation Message:", errorText);

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
    console.log(otp);
    await page.click('input[name="ctl00$ContentPlaceHolder1$btnValidate"]');
    await page.type('input[name="ctl00$ContentPlaceHolder1$txtadharno"]', `${otp}`);

    await page.click('input[name="ctl00$ContentPlaceHolder1$btnValidate"]');

}

//308307480209