import CanteenItem from "./CanteenItem";
import { useState } from "react";
import ChangeWeekdayButton from "./ChangeWeekdayButton";
import { Weekday } from "../common";

export default function WeeklyView() {
    const [day, setDay] = useState(0);

    const canteens = [
        { id: 1, name: "Eat & Meet", location: "loc1" },
        { id: 2, name: "FreeFood", location: "loc2" },
        { id: 3, name: "FaynFood", location: "loc3" },
        { id: 4, name: "FiitFood", location: "loc4" },
    ];
    const canteenItems = canteens.map(c =>
        <CanteenItem canteen={c} weekday={day} />
    );

    const days = [
        Weekday.Monday,
        Weekday.Tuesday,
        Weekday.Wednesday,
        Weekday.Thursday,
        Weekday.Friday,
        Weekday.Saturday,
        Weekday.Sunday
    ];
    const navButtons = days.map(d => 
        <ChangeWeekdayButton setDay={setDay} weekday={d}/>
    );

    return (
        <>
            <nav>{navButtons}</nav>
            <ul>{canteenItems}</ul>
        </>
    );
}