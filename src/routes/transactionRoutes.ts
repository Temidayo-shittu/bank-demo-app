import express from "express";
import { Client } from "../entities/Client";
import { Transaction,TransactionTypes } from "../entities/Transaction";

const transactionRouter = express.Router();

transactionRouter.route("/api/client/:clientId/transaction").post(async (req, res) => {
    const { clientId } = req.params;

    const { type,amount } = req.body;

    const client = await Client.findOne({
        where: {
            id: parseInt(clientId),
        }
    })
    if(!client) {
        return res.json({message: "Client not found"})
    }
    const transaction = Transaction.create({
        type,
        amount,
        client
    })
    await transaction.save();

    if( type === TransactionTypes.DEPOSIT) {
        client.balance = client.balance + amount
    } else if( type === TransactionTypes.WITHDRAW ) {
        client.balance = client.balance - amount
    }
    await client.save()

    return res.status(201).json({
        message: `Transaction for Client ${client.first_name} Successfully Created `,
        data: transaction
    })
})

export { transactionRouter }