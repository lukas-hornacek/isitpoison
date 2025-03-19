import { Modal, Spinner, Stack } from "react-bootstrap";
import { Canteen } from "../types";
import { useGetCanteenDetail } from "../data/canteen";
import OpeningHours from "./OpeningHours";

export default function CanteenDetail({ canteen, show, handleClose }: { canteen: Canteen, show: boolean, handleClose: () => void }) {
    const { canteenDetail, isLoading } = useGetCanteenDetail(canteen.id);
    
    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <h2>{canteen.name}</h2>
                </Modal.Header>
                <Modal.Body>
                    {isLoading ? <Spinner /> : 
                    <Stack>
                        <div>Adresa: {canteenDetail!.location}</div>
                        <div>Otváracie hodiny:</div>
                        <OpeningHours canteenDetail={canteenDetail!}/>
                    </Stack>}
                </Modal.Body>
            </Modal> 
        </>
    );
}