import { Route, Routes } from "react-router";

import NavBar from "../components/NavBar";
import MealsView from "./MealsView";
import WeeklyView from "./WeeklyView";
import ProfileView from "./ProfileView";

import "../styles/global.css";
import AuthenticationProvider from "../auth/AuthenticationProvider";
import AdminCanteensView from "./AdminCanteensView";
import AdminUsersView from "./AdminUsersView";
import AdminReviewsView from "./AdminReviewsView";
import AdminMealsView from "./AdminMealsView";

export default function App() {
  return (
    <AuthenticationProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<WeeklyView />} />
        <Route path="/meals" element={<MealsView />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/admin/meals" element={<AdminMealsView />} />
        <Route path="/admin/canteens" element={<AdminCanteensView />} />
        <Route path="/admin/users"  element={<AdminUsersView />} />
        <Route path="/admin/reviews" element={<AdminReviewsView />} />
      </Routes>
    </AuthenticationProvider>
  );
}