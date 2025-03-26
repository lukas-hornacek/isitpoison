import { Spinner, Stack } from "react-bootstrap";
import { useGetCanteenDetail } from "../data/canteen";

export default function CanteenInformation({ id }: { id: number }) {
    const { canteenDetail, isLoading } = useGetCanteenDetail(id);

    if (isLoading) {
        return <Spinner />;
    }

    const dayToString = (open?: string, close?: string) => {
        return open ? `${open} - ${close}` : "Zatvorené";
    };

    return (
        <Stack>
            <div>Adresa: {canteenDetail!.location}</div>
            <div>Otváracie hodiny:</div>
            <div>Pondelok: {dayToString(canteenDetail!.monday_open, canteenDetail!.monday_close)}</div>
            <div>Utorok: {dayToString(canteenDetail!.tuesday_open, canteenDetail!.tuesday_close)}</div>
            <div>Streda: {dayToString(canteenDetail!.wednesday_open, canteenDetail!.wednesday_close)}</div>
            <div>Štvrtok: {dayToString(canteenDetail!.thursday_open, canteenDetail!.thursday_close)}</div>
            <div>Piatok: {dayToString(canteenDetail!.friday_open, canteenDetail!.friday_close)}</div>
            <div>Sobota: {dayToString(canteenDetail!.saturday_open, canteenDetail!.saturday_close)}</div>
            <div>Nedeľa: {dayToString(canteenDetail!.sunday_open, canteenDetail!.sunday_close)} </div>
        </Stack>
    );
}