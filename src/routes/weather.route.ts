/**
 *
 * RUTA '/weather-api/'
 *
 */
import express from "express";
import controller from "../controllers/weather.controller";
const router = express.Router();

//===============================================================================
//======================= ALL GET METHODS =======================================
router.get("/location/search/", controller.getWoeidByCoordinates);
router.get("/location/:woeid", controller.getWeatherByWoeid);

export = router;
