import { Route, Routes } from "react-router";

import Header from "./Header";
import NavBar from "./NavBar";
import MealsView from "./MealsView";
import TodayView from "./TodayView";
import ProfileView from "./ProfileView";

export default function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<TodayView />} />
        <Route path="/meals" element={<MealsView />} />
        <Route path="/profile" element={<ProfileView />} />
      </Routes>
    </>
  );
}