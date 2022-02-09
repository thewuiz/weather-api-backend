import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(express.json()); //Lectura y parseo del body JSON
app.use(cors()); //Configuracion de CORS

//================================================================================
//=========================== Rutas ==============================================
app.use("/weather-api", require("./routes/weather.route"));

app.listen(process.env.PORT);
