import { Stack } from "react-bootstrap";
import React from "react";
import { Canteen } from "../types";
import { hoursToString } from "../common";

export default function CanteenInformation({ canteen }: { canteen: Canteen }) {
    const address = canteen.location.split("\r\n").map((line, index) =>
        <React.Fragment key={index}>{line} <br /></React.Fragment>);

    return (
        <Stack>
            <div>Adresa:</div>
            {address}
            <div>Otváracie hodiny:</div>
            <div>Pondelok: {hoursToString(canteen.monday_open, canteen.monday_close)}</div>
            <div>Utorok: {hoursToString(canteen.tuesday_open, canteen.tuesday_close)}</div>
            <div>Streda: {hoursToString(canteen.wednesday_open, canteen.wednesday_close)}</div>
            <div>Štvrtok: {hoursToString(canteen.thursday_open, canteen.thursday_close)}</div>
            <div>Piatok: {hoursToString(canteen.friday_open, canteen.friday_close)}</div>
            <div>Sobota: {hoursToString(canteen.saturday_open, canteen.saturday_close)}</div>
            <div>Nedeľa: {hoursToString(canteen.sunday_open, canteen.sunday_close)} </div>
        </Stack>
    );
}