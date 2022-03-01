import "./App.css";
import Home from "./Home";
import Profile from "./Profile";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./ProfileContext";
import { useState } from "react";

function App() {
  const [userContxt, setUserContxt] = useState({ userID: null });
  return (
    <div>
      <UserContext.Provider value={{ userContxt, setUserContxt }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
