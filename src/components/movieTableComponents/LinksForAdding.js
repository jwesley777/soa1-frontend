import {useHistory} from "react-router-dom";

function LinksForAdding() {
    const history = useHistory();

    function addNewPersonClick(evt) {
        evt.preventDefault();
        history.push("/soa-lab1/person/new");
    }

    function addNewLocationClick(evt) {
        evt.preventDefault();
        history.push("/soa-lab1/location/new");
    }

    function addNewCoordinatesClick(evt) {
        evt.preventDefault();
        history.push("/soa-lab1/coordinates/new");
    }

    return (
        <div className="filter-header base">
            <div className={"tasks-div"}>
                <button id="new-ticket-but" onClick={addNewLocationClick}>
                    ADD LOCATION
                </button>
                <button id="new-ticket-but" onClick={addNewPersonClick}>
                    ADD PERSON
                </button>
                <button id="new-ticket-but" onClick={addNewCoordinatesClick}>
                    ADD COORDINATES
                </button>
            </div>
        </div>
    );
}

export default LinksForAdding;
