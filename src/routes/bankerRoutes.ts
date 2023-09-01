import express from "express";
import { Banker } from "../entities/Banker";

//import { createClient } from "src/controllers/client";

const bankerRouter = express.Router();

bankerRouter.route("/api/banker").post(async (req, res) => {
    const { firstName,lastName,email,cardNumber,employeeNumber } = req.body;
    const banker =  Banker.create({
        first_name: firstName,
        last_name: lastName,
        email: email,
        card_number: cardNumber,
        employee_number: employeeNumber
    })
    await banker.save()

    return res.status(201).json({banker})
})

bankerRouter.route("/api/banker/fetchAll").get(async (req, res) => {
    const banker = await Banker.find({})
    
    return res.status(200).json({
        data: banker
    })
})

export { bankerRouter }



