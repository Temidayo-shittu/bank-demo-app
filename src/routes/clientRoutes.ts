import express from "express";
import { Client } from "../entities/Client";
import { createQueryBuilder, QueryBuilder } from "typeorm";

const clientRouter = express.Router();

clientRouter.route("/api/client").post(async (req, res) => {
    const { firstName,lastName,email,cardNumber,balance } = req.body;
    const client =  Client.create({
        first_name: firstName,
        last_name: lastName,
        email: email,
        card_number: cardNumber,
        balance: balance
    })
    await client.save()

    return res.status(201).json({client})
})

clientRouter.route("/api/client/fetchAll").get(async (req, res) => {
    const client = await Client.find({})
    
    return res.status(200).json({
        data: client
    })
})

clientRouter.route("/api/clients").get(async (req, res) => {
    const clients = await createQueryBuilder("client")
    .select("client.first_name")
    .addSelect("client.last_name")
    .addSelect("SUM(transaction)", "sum")
    .from(Client, "client")
    .where("client.balance >= :minBalance AND client.balance <= maxBalance", {minBalance:500, maxBalance:1500})
    
    return res.status(200).json({
        data: clients
    })
})

clientRouter.route("/api/client/:clientId").delete(async (req, res) => {
    const {clientId} = req.params
    const client = await Client.delete(parseInt(clientId))
    
    return res.status(200).json({message: "Client Successfully Deleted"})
})


export { clientRouter }


/*
import express from "express";
import { createClient } from "../controllers/client";
const clientRouter = express.Router();
clientRouter.route("/api/client").post(createClient)


export { clientRouter }
*/
