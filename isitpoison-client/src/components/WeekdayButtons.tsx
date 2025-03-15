import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useEffect, useState } from 'react';

import { Weekday, weekdayToString } from '../common';

export default function WeekdayButtons({ day, setDay }: { day: Weekday, setDay: React.Dispatch<React.SetStateAction<number>> }) {
    const smBreakpoint = 576;
    const [isSmall, setIsSmall] = useState(window.innerWidth < smBreakpoint);

    useEffect(() => {
        const handleResize = () => setIsSmall(window.innerWidth < smBreakpoint);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const days = [
        Weekday.Monday,
        Weekday.Tuesday,
        Weekday.Wednesday,
        Weekday.Thursday,
        Weekday.Friday,
        Weekday.Saturday,
        Weekday.Sunday
    ];
    
    if (isSmall) {
        const buttons = days.map(d =>
            <Dropdown.Item key={d} onClick={() => setDay(d)} active={day === d}>{weekdayToString(d)}</Dropdown.Item>
        );

        return (
            <DropdownButton title="Weekday">
                {buttons}
            </DropdownButton>
        );
    } else {
        const buttons = days.map(d =>
            <Button key={d} onClick={() => setDay(d)} active={day === d}>{weekdayToString(d)}</Button> 
        );

        return (
            <ButtonGroup>
                {buttons}
            </ButtonGroup>
        );
    }
}