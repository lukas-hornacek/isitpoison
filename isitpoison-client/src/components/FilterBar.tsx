import { useState } from "react";
import { Button, ButtonToolbar, Dropdown, Form, InputGroup, Spinner, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { useGetCanteens } from "../data/canteen";
import { Ordering, orderingToString, MealFilters } from "../common";
import { FaCheckSquare, FaRegSquare, FaRegCircle, FaCheckCircle } from "react-icons/fa";

export default function FilterBar({ filters, setFilters }: { filters: MealFilters, setFilters: React.Dispatch<React.SetStateAction<MealFilters>>}) {
    const { canteens, isLoading } = useGetCanteens();
    
    const [selectedCanteens, setSelectedCanteens] = useState(filters.canteen_ids ?? canteens?.map(c => c.id));
    const [ordering, setOrdering] = useState(filters.ordering ?? Ordering.Alphabetical);
    const [searchText, setSearchText] = useState(filters.substring ?? "");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleSearch = () => {
        setFilters({
            canteen_ids: selectedCanteens,
            ordering: ordering,
            substring: searchText,
        });
    };

    const canteenChecks = isLoading ? <Spinner /> : canteens!.map(c =>
        <ToggleButton
            id={`tbc-${c.id}`}
            key={c.id}
            variant={selectedCanteens?.includes(c.id) ? "primary" : "outline-primary"}
            value={c.id}
            className="d-flex align-items-center gap-2 text-start"
        >
            <span className="d-flex align-items-center justify-content-center" style={{ width: "1.25rem" }}>
                {selectedCanteens?.includes(c.id) ? <FaCheckSquare size={16} /> : <FaRegSquare size={16} />}
            </span>
            {c.name}
        </ToggleButton>
    );
    const orderingButtons = [Ordering.Alphabetical, Ordering.LastServed, Ordering.Rating].map(o =>
        <ToggleButton
            id={`tbo-${o}`}
            key={o}
            variant={ordering === o ? "primary" : "outline-primary"}
            value={o}
            className="d-flex align-items-center gap-2 text-start"
        >
            <span className="d-flex align-items-center justify-content-center" style={{ width: "1.25rem" }}>
                {ordering === o ? <FaCheckCircle size={16} /> : <FaRegCircle size={16} />}
            </span>
            {orderingToString(o)}
        </ToggleButton>
    );

    return (
        <ButtonToolbar className="d-flex justify-content-center gap-2">
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
                    value={searchText}
                />
            </InputGroup>
            <Button variant="success" onClick={handleSearch}>Vyhľadaj / Filtruj</Button>
        </ButtonToolbar>
    );
}