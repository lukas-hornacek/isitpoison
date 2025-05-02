import { Stack } from "react-bootstrap";
import { Canteen } from "../types";
import { hoursToString } from "../common";

export default function CanteenInformation({ canteen }: { canteen: Canteen }) {
    const address = canteen.location.split("\r\n").map((line, index) =>
        <p key={index}>{line} <br /></p>);

    return (
        <Stack>
            <p><b>Adresa:</b></p>
            {address}
            <p><b>Otváracie hodiny:</b></p>
            <p>Pondelok: {hoursToString(canteen.monday_open, canteen.monday_close)}</p>
            <p>Utorok: {hoursToString(canteen.tuesday_open, canteen.tuesday_close)}</p>
            <p>Streda: {hoursToString(canteen.wednesday_open, canteen.wednesday_close)}</p>
            <p>Štvrtok: {hoursToString(canteen.thursday_open, canteen.thursday_close)}</p>
            <p>Piatok: {hoursToString(canteen.friday_open, canteen.friday_close)}</p>
            <p>Sobota: {hoursToString(canteen.saturday_open, canteen.saturday_close)}</p>
            <p>Nedeľa: {hoursToString(canteen.sunday_open, canteen.sunday_close)} </p>
        </Stack>
    );
}