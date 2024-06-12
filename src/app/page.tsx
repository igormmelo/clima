"use client";
import { useState } from "react";
import axios from "axios";

type weatherInformation = {
  weather: [{ description: string; icon: string }];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  name: string;
  sys: {
    country: string;
  };
};
const Page = () => {
  const [nameCity, setNameCity] = useState("");
  const [weatherInformation, setWeatherInformation] =
    useState<weatherInformation | null>(null);

  const searchtemperature = async () => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=${process.env.NEXT_PUBLIC_KEY}&units=metric&lang=pt_br`
    );
    setWeatherInformation(res.data);
  };
  console.log(process.env.KEY)
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen ">
      <div className="max-w-[600px] text-center w-full items-center ">
        <h3 className="text-5xl text-black font-semibold mb-6 font-fredoka">
          Clima
        </h3>
        <input
          type="text"
          className="h-9 w-72 mr-2 rounded font-fredoka"
          placeholder="  digite a cidade aqui"
          value={nameCity}
          onChange={(e) => setNameCity(e.target.value)}
        />
        <button
          className="bg-black h-9 w-19 px-3 py-1 rounded text-white font-fredoka"
          onClick={searchtemperature}
        >
          Buscar
        </button>
      </div>
      {weatherInformation && (
        <div className="max-w-[370px] w-full border border-black mt-4 text-center rounded font-fredoka bg-white">
          <h3 className="text-2xl text-black font-semibold mb-3">
            {weatherInformation?.name} - {weatherInformation?.sys.country}
          </h3>
          <div className="grid grid-cols-2">
            <div>
              <h1 className="text-black text-lg">Temperatura</h1>
              <div className="flex justify-center">
                <p className="text-black inline text-3xl">
                  <strong>{Math.round(weatherInformation?.main.temp)}</strong>
                </p>
                <p className="text-black ml-1">
                  {" "}
                  <strong>°C</strong>
                </p>
              </div>
              <img
                className="m-auto"
                src={`https://openweathermap.org/img/wn/${weatherInformation.weather[0].icon}@2x.png`}
                alt="imagem do clima"
              />
              <p className="text-black ">
                {weatherInformation.weather[0].description}
              </p>
            </div>
            <div>
              <p className="text-black ">Temp max</p>
              <div className="flex justify-center">
                <h3 className="text-black">
                  <strong>
                    {Math.round(weatherInformation.main.temp_max)}
                  </strong>
                </h3>
                <p className="text-black text-xs ml-1">
                  {" "}
                  <strong>°c</strong>
                </p>
              </div>
              <p className="text-black ">Temp min</p>
              <div className="flex justify-center">
                <h3 className="text-black">
                  <strong>
                    {Math.round(weatherInformation.main.temp_min)}
                  </strong>
                </h3>
                <p className="text-black text-xs ml-1">
                  {" "}
                  <strong>°c</strong>
                </p>
              </div>
              <p className="text-black ">Sensação term</p>
              <div className="flex justify-center">
                <h3 className="text-black">
                  <strong>
                    {Math.round(weatherInformation.main.feels_like)}
                  </strong>
                </h3>
                <p className="text-black text-xs ml-1">
                  <strong>°c</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

