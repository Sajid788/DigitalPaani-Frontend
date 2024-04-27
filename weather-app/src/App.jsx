// App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import search from "./assets/icons/search.svg";
import { useStateContext } from "./context";
import { Background, Card } from "./Components";
import Loader from "./Components/Loader"; 

function App() {
  const [input, setInput] = useState("");
  const { weather, thisLocation, setPlace } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  const submitCity = async () => {
    setIsLoading(true);
    setPlace(input);
    setInput("");
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleSearchIconClick = () => {
    submitCity();
  };

  useEffect(() => {
    setIsLoading(false);
  }, [thisLocation]);

  return (
    <div className="w-full h-screen text-white px-8">
      <nav className="w-full p-3 flex justify-between items-center">
        <h3 className="font-bold tracking-wide text-2xl">Weather App</h3>
        <div className="bg-white w-[11rem] overflow-hidden shadow-1xl rounded flex items-center p-1.5 gap-2 cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[1.5rem] h-[1.5rem]"
            onClick={handleSearchIconClick}
          />
          <input
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                submitCity();
              }
            }}
            type="text"
            placeholder="Search city"
            className="focus:outline-none w-full text-[#212121] text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </nav>
      <Background></Background>
      <main className="w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center h-[85vh]">
        {isLoading ? (
          <Loader />
        ) : (
          <Card
            place={thisLocation}
            windspeed={weather.windSpeed}
            humidity={weather.humidity}
            temperature={weather.temp}
            heatIndex={weather.heatindex}
            iconString={weather.conditions}
            conditions={weather.conditions}
          />
        )}
      </main>
    </div>
  );
}

export default App;
