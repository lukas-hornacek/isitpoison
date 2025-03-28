import { useContext, useState } from "react";
import { AuthenticationContext } from "../auth/AuthenticationContext";
import { useGetCanteens } from "../data/canteen";
import { Button, ButtonToolbar, Col, Container, Form, InputGroup, ListGroup, ListGroupItem, Row, Spinner } from "react-bootstrap";
import { Canteen } from "../types";
import CanteenDetail from "../components/CanteenDetail";
import { Weekday, weekdayToString } from "../common";

export default function AdminCanteensView() {
    const auth = useContext(AuthenticationContext)!;

    const [searchText, setSearchText] = useState("");
    const [finalText, setFinalText] = useState("");
    const [isAddingCanteen, setIsAddingCanteen] = useState(false);

    const { canteens, isLoading } = useGetCanteens(finalText);

    if (!auth.isAdmin) {
        return (
            <h2>Chyba prístupu</h2>
        );
    }

    if (isLoading) {
        return <Spinner />;
    }

    const canteenItems = canteens?.map(canteen => <AdminCanteenItem key={canteen.id} canteen={canteen}/>);

    return (
        <Container>
            <h2>Jedálne</h2>
            {isAddingCanteen ? <AdminAddCanteen setIsAddingCanteen={setIsAddingCanteen} /> : null}
            <ButtonToolbar className="d-flex justify-content-center">
                {isAddingCanteen ? null : <Button onClick={() => setIsAddingCanteen(true)}>Pridať jedáleň</Button>}
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Zadaj názov jedálne"
                        aria-label="Názov jedálne"
                        onChange={(event) => setSearchText(event.target.value)}
                        value={searchText}
                    />
                    <Button variant="success" onClick={() => setFinalText(searchText)}>Vyhľadaj</Button>
                </InputGroup>
            </ButtonToolbar>

            <ListGroup>{canteenItems}</ListGroup>
        </Container>
    );
}

function AdminCanteenItem({ canteen }: { canteen: Canteen }) {
    return (
        <ListGroupItem key={canteen.id} variant="dark">
            <Row>
                <Col>
                    <h4>{canteen.name}</h4>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button variant="danger">Odstrániť</Button>
                </Col>
            </Row>
            <CanteenDetail id={canteen.id} />
        </ListGroupItem>
    );
}

function AdminAddCanteen({ setIsAddingCanteen }: { setIsAddingCanteen: React.Dispatch<React.SetStateAction<boolean>> }) {
    // form fields
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [mondayOpen, setMondayOpen] = useState<string>("");
    const [tuesdayOpen, setTuesdayOpen] = useState<string>("");
    const [wednesdayOpen, setWednesdayOpen] = useState<string>("");
    const [thursdayOpen, setThursdayOpen] = useState<string>("");
    const [fridayOpen, setFridayOpen] = useState<string>("");
    const [saturdayOpen, setSaturdayOpen] = useState<string>("");
    const [sundayOpen, setSundayOpen] = useState<string>("");
    const [mondayClose, setMondayClose] = useState<string>("");
    const [tuesdayClose, setTuesdayClose] = useState<string>("");
    const [wednesdayClose, setWednesdayClose] = useState<string>("");
    const [thursdayClose, setThursdayClose] = useState<string>("");
    const [fridayClose, setFridayClose] = useState<string>("");
    const [saturdayClose, setSaturdayClose] = useState<string>("");
    const [sundayClose, setSundayClose] = useState<string>("");

    const submit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsAddingCanteen(false);
    };

    return (
        <Form onSubmit={submit}>
            <Form.Group>
                <Form.Label>Názov</Form.Label>
                <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Adresa</Form.Label>
                <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} type="text"/>
            </Form.Group>
            <Form.Group>
                Otváracie hodiny
                <OpeningHours day={Weekday.Monday} open={mondayOpen} setOpen={setMondayOpen} close={mondayClose} setClose={setMondayClose} />
                <OpeningHours day={Weekday.Tuesday} open={tuesdayOpen} setOpen={setTuesdayOpen} close={tuesdayClose} setClose={setTuesdayClose} />
                <OpeningHours day={Weekday.Wednesday} open={wednesdayOpen} setOpen={setWednesdayOpen} close={wednesdayClose} setClose={setWednesdayClose}/>
                <OpeningHours day={Weekday.Thursday} open={thursdayOpen} setOpen={setThursdayOpen} close={thursdayClose} setClose={setThursdayClose}/>
                <OpeningHours day={Weekday.Friday} open={fridayOpen} setOpen={setFridayOpen} close={fridayClose} setClose={setFridayClose}/>
                <OpeningHours day={Weekday.Saturday} open={saturdayOpen} setOpen={setSaturdayOpen} close={saturdayClose} setClose={setSaturdayClose}/>
                <OpeningHours day={Weekday.Sunday} open={sundayOpen} setOpen={setSundayOpen} close={sundayClose} setClose={setSundayClose}/>
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
                <Button type="submit">Pridať</Button>
                <Button onClick={() => setIsAddingCanteen(false)} variant="danger">Zrušiť</Button>
            </Form.Group>
        </Form>
    );
}

function OpeningHours({ day, open, setOpen, close, setClose }: { day: Weekday, open: string, setOpen: React.Dispatch<React.SetStateAction<string>>,
    close: string, setClose: React.Dispatch<React.SetStateAction<string>>}) {
    return (
        <>
            <Row><Col>{weekdayToString(day)}</Col></Row>
            <Row>
                <Col>Od: <Form.Control value={open} onChange={(e) => setOpen(e.target.value)} type="text"/></Col>
                <Col>Do: <Form.Control value={close} onChange={(e) => setClose(e.target.value)} type="text"/></Col>
            </Row>
        </>
    );
}