import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import { Console } from "console";

let http_params = {
  lattlong: "",
  query: "",
};

//==================================================================================
//============================= GET WEATHER BY WOEID ===============================
const getWoeidByCoordinates = async (req: Request, res: Response) => {
  let { query, lattlong } = req.query;

  if (query) {
    http_params.query = query as string;
    http_params.lattlong = "";
  } else {
    http_params.lattlong = lattlong as string;
    http_params.query = "";
  }

  await axios
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
};

//==================================================================================
//============================= GET WEATHER BY WOEID ===============================
const getWeatherByWoeid = async (req: Request, res: Response) => {
  let { woeid } = req.params;

  await axios
    .get(`${process.env.BASE_URL}/location/${woeid}/`)
    .then((response: any) => {
      response.data.consolidated_weather =
        response.data.consolidated_weather.map((r: any) => {
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
};

export default { getWoeidByCoordinates, getWeatherByWoeid };
