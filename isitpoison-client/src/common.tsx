export enum Weekday {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
}

export function weekdayToString(weekday: Weekday) {
    switch (weekday) {
        case Weekday.Sunday:
            return "Sunday";
        case Weekday.Monday:
            return "Monday";
        case Weekday.Tuesday:
            return "Tuesday";
        case Weekday.Wednesday:
            return "Wednesday";
        case Weekday.Thursday:
            return "Thursday";
        case Weekday.Friday:
            return "Friday";
        case Weekday.Saturday:
            return "Saturday";
    }
}