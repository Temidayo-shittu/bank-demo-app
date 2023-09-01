import express from "express";
import { Client } from "../entities/Client";
import { Banker } from "../entities/Banker";

const clientBankerRouter = express.Router();

clientBankerRouter.route("/api/client/:clientId/banker/:bankerId").put(async (req, res) => {
    const { clientId,bankerId } = req.params;

    const client = await Client.findOne({
        where: {
            id: parseInt(clientId),
        }
    })

    const banker = await Banker.findOne({
        where: {
            id: parseInt(bankerId),
        }
    })

    if(!client || !banker) {
        return res.json({message: "Client or Banker not found"})
    }
    banker.clients = [client]
    await banker.save();

    return res.status(200).json({
        message: `Client Successfully Connected`
    })
})

export { clientBankerRouter }