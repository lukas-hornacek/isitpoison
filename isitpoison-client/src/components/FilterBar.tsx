import { useState } from "react";
import { Button, ButtonToolbar, Dropdown, Form, InputGroup, ToggleButton, ToggleButtonGroup } from "react-bootstrap";

import { getCanteens } from "../data/mock";

export default function FilterBar() {
    const canteens = getCanteens();

    const [selectedCanteens, setSelectedCanteens] = useState(canteens.map(c => c.id));
    const [ordering, setOrdering] = useState(0);
    const [searchText, setSearchText] = useState("");


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleSearch = () => {
        console.log(selectedCanteens);
        console.log(ordering);
        console.log(searchText);
    };

    const canteenChecks = canteens.map(c =>
        <ToggleButton
            id={`tbc-${c.id}`}
            key={c.id}
            type="checkbox"
            variant={selectedCanteens.includes(c.id) ? "primary" : "outline-primary"}
            value={c.id}>{c.name}</ToggleButton>
    );
    const orderingButtons = [0, 1, 2, 3].map(o =>
        <ToggleButton
            id={`tbo-${o}`}
            key={o}
            type="radio"
            variant={ordering === o ? "primary" : "outline-primary"}
            value={o}
        >{o}</ToggleButton>
    );

    return (
        <ButtonToolbar className="d-flex justify-content-center">
            <Dropdown>
                <Dropdown.Toggle>Jedálne</Dropdown.Toggle>
                <Dropdown.Menu>
                    <ToggleButtonGroup type="checkbox" value={selectedCanteens} onChange={setSelectedCanteens} vertical className="w-100">
                        {canteenChecks}
                    </ToggleButtonGroup>
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
                <Dropdown.Toggle>Usporiadanie</Dropdown.Toggle>
                <Dropdown.Menu>
                    <ToggleButtonGroup name="ordering" type="radio" value={ordering} onChange={setOrdering} vertical className="w-100">
                        {orderingButtons}
                    </ToggleButtonGroup>
                </Dropdown.Menu>
            </Dropdown>

            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder="Zadaj názov jedla"
                    aria-label="Názov jedla"
                    onChange={handleInputChange}
                />
            </InputGroup>
            <Button variant="success" onClick={handleSearch}>Vyhľadaj / Filtruj</Button>
        </ButtonToolbar>
    );
}