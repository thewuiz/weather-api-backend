"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json()); //Lectura y parseo del body JSON
app.use((0, cors_1.default)()); //Configuracion de CORS
//================================================================================
//=========================== Rutas ==============================================
app.use("/weather-api", require("./routes/weather.route"));
app.listen(process.env.PORT, () => {
    console.log("servidor corriendo: " + process.env.PORT);
});
