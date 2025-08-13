import express from 'express'
import { Request, Response } from 'express';
import { addAadharDetails, validateOTPAadhar } from './puppeteerLogic';
require('dotenv').config()
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));

app.post('/scrpe', async (req, res) => {
    const {aadharNo, name} = req.body;
    console.log(aadharNo, name);
    try {
        const response = await addAadharDetails(aadharNo, name);
        res.status(202).json(
            response
        )
    } catch (error) {
        res.status(500).json({
            message: "something went wrong"
        })    
    }
})

app.post('/aadharOtp', async(req, res) => {
    const {otp, name} = req.body;
    console.log(otp, name);

    try {
        const response = await validateOTPAadhar(otp, name);
        res.status(202).json({
            response
        }) 
    } catch (error) {
        res.status(500).json({
            message: "something went wrong"
        })
    }
})

app.get('/home', (req: Request, res: Response) => {
    res.json({
        message: "hello"
    })
})

app.listen(process.env.PORT)
