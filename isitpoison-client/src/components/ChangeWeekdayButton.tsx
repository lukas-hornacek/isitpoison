import { Weekday, weekdayToString } from '../common';

export default function ChangeWeekdayButton({ setDay, weekday }: { setDay: React.Dispatch<React.SetStateAction<number>>, weekday: Weekday}) {
    return (
        <button onClick={() => setDay(weekday)}>{weekdayToString(weekday)}</button>
    );
}