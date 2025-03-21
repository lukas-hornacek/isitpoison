import { Route, Routes } from "react-router";

import NavBar from "./NavBar";
import MealsView from "./MealsView";
import WeeklyView from "./WeeklyView";
import ProfileView from "./ProfileView";

import "../styles/global.css";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<WeeklyView />} />
        <Route path="/meals" element={<MealsView />} />
        <Route path="/profile" element={<ProfileView />} />
      </Routes>
    </>
  );
}