import { Modal } from "react-bootstrap";
import { Canteen } from "../types";
import CanteenInformation from "./CanteenDetail";

export default function CanteenModal({ canteen, show, handleClose }: { canteen: Canteen, show: boolean, handleClose: () => void }) {
    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <h2>{canteen.name}</h2>
            </Modal.Header>
            <Modal.Body>
                <CanteenInformation id={canteen.id} />
            </Modal.Body>
        </Modal> 
    );
}