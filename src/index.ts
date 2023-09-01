import { DataSource } from "typeorm";
import express from "express";
import { Banker } from "./entities/Banker";
import { Client } from "./entities/Client";
import { Transaction } from "./entities/Transaction";
import { clientRouter } from "./routes/clientRoutes";
import { bankerRouter } from "./routes/bankerRoutes";
import { transactionRouter } from "./routes/transactionRoutes";
import { clientBankerRouter } from "./routes/connectClientToBankerRoutes";

const app = express();

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "charity",
    database: "typeorm",
    entities: [Client, Banker, Transaction],
    synchronize: true
})

const main = async () => {
    try {
        await AppDataSource.initialize()
        console.log("Connected to Postgres")

        app.get("/", (req, res) => res.send("API is running"));
        app.use(express.json());
        app.use(clientRouter);
        app.use(bankerRouter);
        app.use(transactionRouter);
        app.use(clientBankerRouter);

        app.listen(8080,() =>{
            console.log("Listening on port 8080")
        })
    } catch (error) {
        console.error(error)
        throw new Error("Unable to connect to db")
    }

}

main()