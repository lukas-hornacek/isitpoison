import { Route, Routes } from "react-router";

import Header from "./Header";
import NavBar from "./NavBar";
import MealsView from "./MealsView";
import WeeklyView from "./WeeklyView";
import ProfileView from "./ProfileView";

export default function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<WeeklyView />} />
        <Route path="/meals" element={<MealsView />} />
        <Route path="/profile" element={<ProfileView />} />
      </Routes>
    </>
  );
}