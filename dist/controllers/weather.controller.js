"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
let http_params = {
    lattlong: "",
    query: "",
};
//==================================================================================
//============================= GET WEATHER BY WOEID ===============================
const getWoeidByCoordinates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { query, lattlong } = req.query;
    if (query) {
        http_params.query = query;
        http_params.lattlong = "";
    }
    else {
        http_params.lattlong = lattlong;
        http_params.query = "";
    }
    yield axios_1.default
        .get(`${process.env.BASE_URL}/location/search/`, { params: http_params })
        .then((response) => {
        return res.json(response.data);
    })
        .catch(function (error) {
        return res.status(500).json({
            ok: false,
            msg: `Ups!, ocurrio un error: ${error}`,
        });
    });
});
//==================================================================================
//============================= GET WEATHER BY WOEID ===============================
const getWeatherByWoeid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { woeid } = req.params;
    yield axios_1.default
        .get(`${process.env.BASE_URL}/location/${woeid}/`)
        .then((response) => {
        response.data.consolidated_weather =
            response.data.consolidated_weather.map((r) => {
                r.max_temp = r.max_temp.toFixed();
                r.min_temp = r.min_temp.toFixed();
                r.wind_speed = r.wind_speed.toFixed();
                r.the_temp = r.the_temp.toFixed();
                r.visibility = r.visibility.toFixed();
                r.applicable_date = new Date(`${r.applicable_date}T00:00:00`);
                r.weather_state_abbr = `https://www.metaweather.com/static/img/weather/png/${r.weather_state_abbr}.png`;
                return r;
            });
        return res.status(response.status).json(response.data);
    })
        .catch(function (error) {
        return res.status(error.response.status).json({
            message: error.message,
        });
    });
});
exports.default = { getWoeidByCoordinates, getWeatherByWoeid };
