/*
import { Client } from "../entities/Client";
import express from "express";
import { Router } from "express"
express.Router()


const createClient = async (req:Request, res:Response) => {
    const { firstName,lastName,email,cardNumber,balance } = req.body;
    const client = await Client.create({
        first_name: firstName,
        last_name: lastName,
        email: email,
        card_number: cardNumber,
        balance: balance
    })

    return res.json({client})

}

export { createClient }
*/

