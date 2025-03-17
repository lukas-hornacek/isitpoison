import { Modal, Stack } from "react-bootstrap";
import { Canteen } from "../types";

export default function CatneenDetail({ canteen, show, handleClose }: { canteen: Canteen, show: boolean, handleClose: () => void }) {
    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <h2>{canteen.name}</h2>
                </Modal.Header>
                <Modal.Body>
                    <Stack>
                        <div>Adresa:</div>
                        <div>Otváracie hodiny:</div>
                    </Stack>
                </Modal.Body>
            </Modal> 
        </>
    );
}