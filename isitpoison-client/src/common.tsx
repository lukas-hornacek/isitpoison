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
            return "Nedeľa";
        case Weekday.Monday:
            return "Pondelok";
        case Weekday.Tuesday:
            return "Utorok";
        case Weekday.Wednesday:
            return "Streda";
        case Weekday.Thursday:
            return "Štvrtok";
        case Weekday.Friday:
            return "Piatok";
        case Weekday.Saturday:
            return "Sobota";
    }
}

export function today(): Weekday {
    return new Date().getDay();
}