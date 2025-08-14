import express from 'express'
import { Request, Response } from 'express';
import { addAadharDetails, addPanDetails, validateOTPAadhar } from './puppeteerLogic';
import prisma from './primsaConfig'
require('dotenv').config()
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));

app.post('/scrpepan', async (req, res) => {
    const {aadharNo, orgType, pan, name, dob, userName} = req.body;
    console.log(orgType,pan,name,dob,userName);

    try {
        const response = await addPanDetails(orgType, pan, name, dob, userName);
        res.setHeader('Content-Type', 'application/json')
        if(response.success){
            await prisma.$transaction(async (tx) => {
                const newUser = await tx.user.create({
                    data: {
                        name: userName
                    }
                });

                await tx.aadharDetails.create({
                    data: {
                        userId: newUser.id,
                        aadharNumber: aadharNo
                    }
                })


                await tx.panDetails.create({
                    data: {
                        userId: newUser.id,
                        orgType: orgType,
                        panNumber: pan,
                        holderName: name,
                        dob: dob
                    }
                })
            })
        }
        res.status(202).json(
            response
        )
    } catch (error) {
        res.status(500).json({
            message: "something went wrong"
        })
    }
})

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
        res.setHeader('Content-Type', 'application/json')
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
