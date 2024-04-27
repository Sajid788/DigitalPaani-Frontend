import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("Ranchi");
  const [thisLocation, setLocation] = useState("");

  const fetchWeather = async () => {
    const options = {
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?lat=23.344101&lon=85.309563&units=metric`,
      params: {
        q: place,
        units: "metric",
        appid: "c882abadc882bb8063e64217bb444a16",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);

      const thisData = response.data;
      setLocation(thisData.name);
      setValues([thisData.main]);
      setWeather({
        ...thisData.main,
        windSpeed: thisData.wind.speed,
        conditions: thisData.weather[0].description,
      });
    } catch (e) {
      console.error(e);
      alert("This place does not exist");
    }
  };

  
  useEffect(() => {
    fetchWeather();
  }, [place]);


  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <StateContext.Provider
      value={{
        weather,
        setPlace,
        values,
        thisLocation,
        place,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);