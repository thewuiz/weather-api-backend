"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/**
 *
 * RUTA '/weather-api/'
 *
 */
const express_1 = __importDefault(require("express"));
const weather_controller_1 = __importDefault(require("../controllers/weather.controller"));
const router = express_1.default.Router();
//===============================================================================
//======================= ALL GET METHODS =======================================
router.get("/location/search/", weather_controller_1.default.getWoeidByCoordinates);
router.get("/location/:woeid", weather_controller_1.default.getWeatherByWoeid);
module.exports = router;
