import { useContext, useState } from "react";
import { AuthenticationContext } from "../auth/AuthenticationContext";
import { addCanteen, deleteCanteen, updateCanteen, useGetCanteens } from "../data/canteen";
import { Button, ButtonToolbar, Col, Container, Form, InputGroup, ListGroup, ListGroupItem, Row, Spinner, Stack } from "react-bootstrap";
import { Canteen } from "../types";
import CanteenInformation from "../components/CanteenInformation";
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
        <Stack gap={2}>
            <h2>Jedálne</h2>
            <ButtonToolbar className="d-flex justify-content-center gap-2">
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

            <ListGroup>
                {isAddingCanteen ? <AdminAddCanteen setIsDisplayed={setIsAddingCanteen} /> : null}
                {canteenItems}
            </ListGroup>
        </Stack>
        </Container>
    );
}

function AdminCanteenItem({ canteen }: { canteen: Canteen }) {
    const [isEditing, setIsEditing] = useState(false);

    const remove = async () => {
        await deleteCanteen(canteen.id);
    };

    if (isEditing) {
        return <AdminAddCanteen canteen={canteen} setIsDisplayed={setIsEditing} />;
    } else {
        return (
            <ListGroupItem key={canteen.id} variant="dark">
                <Row className="align-items-start">
                    <Col>
                        <h4>{canteen.name}</h4>
                    </Col>
                    <Col className="d-flex justify-content-end gap-2">
                        <Button variant="danger" onClick={remove}>Odstrániť</Button>
                        <Button onClick={() => setIsEditing(true)}>Upraviť</Button>
                    </Col>
                </Row>
                <CanteenInformation canteen={canteen} />
            </ListGroupItem>
        );
    }
}

function AdminAddCanteen({ setIsDisplayed, canteen }: { setIsDisplayed: React.Dispatch<React.SetStateAction<boolean>>, canteen?: Canteen }) {
    // form fields
    const [name, setName] = useState(canteen?.name ?? "");
    const [address, setAddress] = useState(canteen?.location ?? "");
    const [mondayOpen, setMondayOpen] = useState<string>(canteen?.monday_open ?? "");
    const [tuesdayOpen, setTuesdayOpen] = useState<string>(canteen?.tuesday_open ?? "");
    const [wednesdayOpen, setWednesdayOpen] = useState<string>(canteen?.wednesday_open ?? "");
    const [thursdayOpen, setThursdayOpen] = useState<string>(canteen?.thursday_open ?? "");
    const [fridayOpen, setFridayOpen] = useState<string>(canteen?.friday_open ?? "");
    const [saturdayOpen, setSaturdayOpen] = useState<string>(canteen?.saturday_open ?? "");
    const [sundayOpen, setSundayOpen] = useState<string>(canteen?.sunday_open ?? "");
    const [mondayClose, setMondayClose] = useState<string>(canteen?.monday_close ?? "");
    const [tuesdayClose, setTuesdayClose] = useState<string>(canteen?.tuesday_close ?? "");
    const [wednesdayClose, setWednesdayClose] = useState<string>(canteen?.wednesday_close ?? "");
    const [thursdayClose, setThursdayClose] = useState<string>(canteen?.thursday_close ?? "");
    const [fridayClose, setFridayClose] = useState<string>(canteen?.friday_close ?? "");
    const [saturdayClose, setSaturdayClose] = useState<string>(canteen?.saturday_close ?? "");
    const [sundayClose, setSundayClose] = useState<string>(canteen?.sunday_close ?? "");

    const [error, setError] = useState("");

    const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const ok = canteen ? await updateCanteen(canteen.id, name, address, mondayOpen, mondayClose,
            tuesdayOpen, tuesdayClose, wednesdayOpen, wednesdayClose, thursdayOpen, thursdayClose,
            fridayOpen, fridayClose, saturdayOpen, saturdayClose, sundayOpen, sundayClose) 
            : await addCanteen(name, address, mondayOpen, mondayClose, tuesdayOpen, tuesdayClose,
            wednesdayOpen, wednesdayClose, thursdayOpen, thursdayClose, fridayOpen, fridayClose,
            saturdayOpen, saturdayClose, sundayOpen, sundayClose);
        if (ok) {
            setIsDisplayed(false);
        } else {
            setError("Pridanie jedla bolo neúspešné.");
        }
    };

    return (
        <ListGroupItem key={canteen?.id ?? -1} variant="dark">
            <Form onSubmit={submit}>
                <Stack gap={2}>
                    {error !== "" ? <div className="text-danger">{error}</div> : null}
                    <Form.Group>
                        <Form.Label>Názov</Form.Label>
                        <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Adresa</Form.Label>
                        <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} type="text" />
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
                    <Form.Group className="d-flex justify-content-center gap-2">
                        <Button type="submit">Pridať</Button>
                        <Button onClick={() => setIsDisplayed(false)} variant="danger">Zrušiť</Button>
                    </Form.Group>
                </Stack>
            </Form>
        </ListGroupItem>
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