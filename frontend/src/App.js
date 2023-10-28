import './App.css';
import * as React  from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Players from "./pages/PlayerRounds";
import RoundsWinners from "./pages/RoundsWinners";
import RoundsWinnersTotal from "./pages/RoundsWinners";
import TotalPoints from "./pages/TotalPoints";
import AllRounds from "./pages/AllRounds";
import Home from "./pages/Home";
import PlayerList from "./pages/PlayerList";

function App() {
  return (
    <div className="realfevrJM">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/TotalPoints" element={<TotalPoints />} />
          <Route path="/PlayerRounds/:player" element={<Players />} />
          <Route path="/PlayerList" element={<PlayerList />} />
          <Route path="/RoundsWinners" element={<RoundsWinners />} />
          <Route path="/RoundsWinnersTotal" element={<RoundsWinnersTotal />} />
          <Route path="/AllRounds" element={<AllRounds />} />
        </Routes>


      </BrowserRouter>
    </div>
  );
}

export default App;
